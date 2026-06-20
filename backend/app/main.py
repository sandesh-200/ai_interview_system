from fastapi import FastAPI,APIRouter
from core.database import engine
from models.base import Base
from core.config import settings
from utils.rate_limit import limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_exception_handler(RateLimitExceeded,_rate_limit_exceeded_handler)

api_router = APIRouter(prefix="/api")
app.include_router(api_router)

api_router.include_router(auth_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

