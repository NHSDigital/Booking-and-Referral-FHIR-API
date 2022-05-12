options = [
    {
        "name": "--service-name",
        "required": True,
        "action": "store",
        "help": "The name of the service. This is should be the same name as proxy "
                "without appending env name or PR number."
    },
    {
        "name": "--proxy-base-path",
        "required": True,
        "action": "store",
        "help": "The base path for the deployed proxy without appending env name or PR number."
    },
    {
        "name": "--default-client-id",
        "required": False,
        "action": "store",
        "help": "client-id of the default Apigee app."
    },
    {
        "name": "--default-client-secret",
        "required": False,
        "action": "store",
        "help": "client-secret of the default Apigee app."
    },
    {
        "name": "--default-callback-url",
        "required": False,
        "action": "store",
        "help": "Redirect url for Apigee default app."
    },
    {
        "name": "--apigee-environment",
        "required": True,
        "action": "store",
        "help": "Apigee environment",
    },
    {
        "name": "--oauth-base-uri",
        "required": True,
        "action": "store",
        "help": "Base Uri "
                "Pass a dummy string if your tests don't need one."
    },
    {
        "name": "--pr-no",
        "required": False,
        "action": "store",
        "help": "The github pull request number. Example --pr-no=42."
    }
]


def create_cmd_options(get_cmd_opt_value) -> dict:
    cmd_options = {}
    for opt in options:
        opt_name = opt["name"]
        value = get_cmd_opt_value(opt_name)

        cmd_options.update({opt_name: value})
        if opt["required"] and not value:
            raise Exception(f"Option {opt_name} is required but it's value is empty or null")

    __validate_options(cmd_options)

    __set_service_name(cmd_options)

    __set_base_path(cmd_options)

    return cmd_options

def __set_service_name(cmd_options):
    env = cmd_options["--apigee-environment"]
    default_service_name = cmd_options["--service-name"]
    pr_no = cmd_options.get("--pr-no")

    if env == 'internal-dev':
        service_name = f"{default_service_name}-pr-{pr_no}" if pr_no else f"{default_service_name}-internal-dev"

    elif env == "internal-dev-sandbox":
        service_name = f"{default_service_name}-pr-{pr_no}-sandbox"

    else:
        service_name = f"{default_service_name}-{env}"

    cmd_options["--service-name"] = service_name

def __set_base_path(cmd_options):
    env = cmd_options["--apigee-environment"]
    pr_no = cmd_options.get("--pr-no")
    default_base_path = cmd_options["--proxy-base-path"]

    if env in ["internal-dev",  "internal-dev-sandbox"] and pr_no:
        base_path = f"{default_base_path}-pr-{pr_no}"
        cmd_options["--proxy-base-path"] = base_path


def __validate_options(cmd_options):
    """Whether some values are required or not might change depending on deployment environment"""
    current_env = cmd_options["--apigee-environment"]

    #  For certain environments we can't use apigee token. For those, user must provide information about default app
    apigee_api_permitted_envs = ['internal-dev', 'internal-qa', 'internal-dev-sandbox']
    if current_env not in apigee_api_permitted_envs:
        client_id = cmd_options["--default-client-id"]
        client_secret = cmd_options["--default-client-secret"]
        callback_url = cmd_options["--default-callback-url"]
        if not (client_id and client_secret and callback_url):
            raise Exception(
                f"These options: --default-client-id, --default-client-secret and --default-callback-url "
                f"are required for environment: {current_env}")

    # internal-dev-sandbox environment is only allowed for pull requests, so --pr-no becomes mandatory
    if current_env == "internal-dev-sandbox" and not cmd_options.get("--pr-no"):
        raise Exception(f"options --pr-no is mandatory for {current_env}")
