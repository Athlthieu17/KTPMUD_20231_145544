from fastapi import APIRouter

from .routers import auth, users, event, detail_event, contract, fee_event
router = APIRouter()

router.include_router(router=users.router, prefix="/users", tags=["Users"])
router.include_router(router=auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(router=event.router, prefix="/event", tags=["Event"])
router.include_router(router=detail_event.router, prefix="/detail_event", tags=["Detail_event"])
router.include_router(router=contract.router, prefix="/contract", tags=["Contract"])
router.include_router(router=fee_event.router, prefix="/fee_event", tags=["Fee_event"])

