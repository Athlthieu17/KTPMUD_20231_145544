from fastapi import HTTPException, status

JWTExpiredException = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN, detail="JWT has expired"
) #jwt het han


JWTInvalidAudienceException = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN, detail="Incorrect JWT audience."
) #jwt khong chinh xac

InvalidCredentialsException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Credentials could not be validated",
) #khong xac thuc duoc danh tinh

UnauthorizedException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not authenticated."
) #khog duoc xac thuc user

UserNotFoundException = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail="The specified user was not found."
)

AUTHENTICATION_FAILED = "Could not validate credentials."
FORBIDDEN = "You are not authorized to access this resource."
REGISTRATION_CLOSED = "Open user registration is forbidden on this server"

USER_EXISTS = "Email address is already in use."
USER_INACTIVE = "User is inactive."

_NOT_FOUND = "{item} not found."
USER_NOT_FOUND = _NOT_FOUND.format(item="User")

EMAIL_NOT_FOUND = _NOT_FOUND.format(item="Email address")