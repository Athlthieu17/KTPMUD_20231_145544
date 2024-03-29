from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import apirouter

#tu dong tao db
# models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=apirouter.router, prefix="/api")

@app.get("/")
async def test():
    return "hello, test api"
