from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware # CORS 미들웨어 라이브러리 불러오기


class Memo(BaseModel):
    id:int
    content:str
    
memos = []
    
app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return "메모 추가에 성공했습니다."

@app.get("/memos")
def read_memo():
    return memos
    
app.mount("/", StaticFiles(directory="static", html=True), name="static")

# 도메인 명시
origins = [
    "*"
    # "http://xxx.xxx.xxx.xxx"
    # "http://{접근 허용하고자 하는 도메인}",
]

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # 접근 허용할 도메인 지정
    allow_credentials=True,    # 인증 정보(쿠키 등)를 허용할지 여부를 설정
    allow_methods=["*"],       # 허용할 HTTP 메서드를 지정, 여기서는 모든 메서드 허용
    allow_headers=["*"],       # 허용할 HTTP 헤더를 지정, 여기서는 모든 헤더 허용
)


