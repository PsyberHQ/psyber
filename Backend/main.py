from fastapi import FastAPI
from app.core.starter import lifespan
from app.core.configs import DEBUG_MODE,origins
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth
from app.routers import user

app = FastAPI(
    lifespan=lifespan,
    title='Psyber Backend App',
    version='0.1.0',
    debug=DEBUG_MODE,
    description='<h3><b>Health is wealth,Start with your mental health</b></h3>',
    servers=[
        {"url": "http://localhost:8000", "description": "Local Development"},
        {"url": "...", "description": "Production Server"}
    ],
    docs_url='/'
    )

#STUB - Set in full production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router,prefix='/api')
app.include_router(user.router,prefix='/api')