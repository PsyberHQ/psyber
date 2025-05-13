from fastapi import FastAPI
from app.core.starter import lifespan
from app.core.configs import DEBUG_MODE,origins,SECRET_KEY,DEPLOYED_URL
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth,user,quiz
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI(
    lifespan=lifespan,
    title='Psyber Backend App',
    version='0.1.0',
    debug=DEBUG_MODE,
    description='<h3><b>Health is wealth,Start with your mental health</b></h3>',
    servers=[
        {"url": "http://localhost:8000", "description": "Local Development"},
        {"url":DEPLOYED_URL , "description": "Production Server"}
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
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY) # type: ignore
app.include_router(auth.router,prefix='/api')
app.include_router(user.router,prefix='/api')
app.include_router(quiz.router,prefix='/api')