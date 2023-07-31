function makeError(id, profile, severity, code, system, systemCode, diagnostics) {
    return {
        "resourceType": "OperationOutcome",
        "id": id,
        "meta": {
            "profile": [
                profile,
            ]
        },
        "issue": [
            {
                "severity": severity,
                "code": code,
                "details": {
                    "coding": [
                        {
                            "system": system,
                            "code": systemCode
                        }
                    ]
                },
                "diagnostics": diagnostics
            }
        ]
    }
}

const errorRepository = {
    "401UnauthorizedSecurity": makeError(
        id = "d7aaf12e-7b94-4ef6-b047-d2d92981b1cd",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "security",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "SEND_UNAUTHORIZED",
        diagnostics = "The user or system was not able to be authenticated, either the access token was invalid, or not provided."
    ),
    "401UnauthorizedUnknown": makeError(
        id = "e1112dbd-7aaf-412e-9b94-ef6e047d2d92",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "unknown",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "SEND_UNAUTHORIZED",
        diagnostics = "No Access token was provided."
    ),
    "403ProxyNotEnabled": makeError(
        id = "3ce474db-cbc8-4682-a5ab-ca2a4eda1dae",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "forbidden",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "SEND_FORBIDDEN",
        diagnostics = "The access token was provided, but BaRS is not enabled."
    ),

    // FIXME: id is not provided.
    "400InvalidBase64Encoding": makeError(
        id = "",
        profile = "https://fhir.hl7.org.uk/StructureDefinition/UKCore-OperationOutcome",
        severity = "error",
        code = "400",
        system = "http://hl7.org/fhir/ValueSet/operation-outcome",
        systemCode = "PROXY_BAD_REQUEST",
        diagnostics = "The base64 decoding of the NHSD-Target-Identifier header failed."
    ),
    // FIXME: id is not provided.
    "400InvalidTargetIdentifierValue": makeError(
        id = "",
        profile = "https://fhir.hl7.org.uk/StructureDefinition/UKCore-OperationOutcome",
        severity = "error",
        code = "structure",
        system = "http://hl7.org/fhir/ValueSet/operation-outcome",
        systemCode = "PROXY_BAD_REQUEST",
        diagnostics = "Invalid schema for NHSD-Target-Identifier header"
    ),
    "404ProxyNotFound": makeError(
        id = "531e073a-3295-4e67-ae90-e00bd96a9cdd",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "not-found",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "PROXY_NOT_FOUND",
        diagnostics = "The target endpoint does not exist in the Endpoint Catalogue."
    ),
    "403ReceiverMtls": makeError(
        id = "c936667e-13b0-4f56-94b1-e944a459837e",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "forbidden",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "REC_FORBIDDEN",
        diagnostics = "TLS-MA failure."
    ),
    "408TimeoutError": makeError(
        id = "5abca2a4-eda1-4dae-8cc9-5d48c6b791dc",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "timeout",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "REC_TIMEOUT",
        diagnostics = "The connection to the Receiver timed out."
    ),
    "503ServiceUnavailable": makeError(
        id = "4b87b05b-7a20-4994-abea-57778024d216",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "transient",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "REC_SERVICE_UNAVAILABLE",
        diagnostics = "The response from the receiver was a 503, with no detail. Also useful if there is a connection failure such as the endpoint not being found, or failing to resolve."
    ),
    "500ServerErrorException": makeError(
        id = "b38b875b-a1cf-4104-a900-3a5d3ce474db",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "exception",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "REC_SERVER_ERROR",
        diagnostics = "unhandled exception."
    ),
    "500ServerErrorNoStore": makeError(
        id = "ca0f6c46-589e-4558-a937-d4974e1112db",
        profile = "https://simplifier.net/guide/UKCoreDevelopment2/ProfileUKCore-OperationOutcome",
        severity = "error",
        code = "no-store",
        system = "https://fhir.nhs.uk/Codesystem/http-error-codes",
        systemCode = "REC_SERVER_ERROR",
        diagnostics = "internal data storage issue."
    ),
}

