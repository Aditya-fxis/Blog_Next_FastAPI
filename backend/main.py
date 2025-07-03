from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from collections import defaultdict
from app.routes import blog
from app import models
from app.session import engine
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Set, Tuple, List


app = FastAPI(
    docs_url=None,  # Disables Swagger UI (/docs)
    redoc_url=None,  # Disables ReDoc UI (/redoc)
    openapi_url=None,  # Disables OpenAPI schema (/openapi.json)
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can use ["http://localhost:3000"] for safety in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(blog.router)

@app.get("/")
def root():
    return {"msg": "Hello FastAPI 🚀"}


# @app.websocket("/ws")
# async def health_check(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         try:
#             data = await websocket.receive_text()
#             await websocket.send_json({"msg": data})
#         except:
#             break

# # Store connected clients
# connected_clients: set[WebSocket] = set()

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     connected_clients.add(websocket)
#     try:
#         while True:
#             data = await websocket.receive_text()
#             # Broadcast to all connected clients
#             for client in connected_clients:
#                 await client.send_text(f"Broadcast: {data}")
#     except WebSocketDisconnect:
#         connected_clients.remove(websocket)
# # Store (websocket, username) pairs

# connected_clients: set[tuple[WebSocket, str]] = set()

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket, username: str = Query(...)):
#     await websocket.accept()
#     connected_clients.add((websocket, username))
#     try:
#         while True:
#             data = await websocket.receive_text()
#             message = f"{username}: {data}"
#             for client, _ in connected_clients:
#                 await client.send_text(message)
#     except WebSocketDisconnect:
#         connected_clients.remove((websocket, username))


# Store connections per room
rooms: Dict[str, List[Tuple[WebSocket, str]]] = defaultdict(list)

@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    username: str = Query(...),
    room: str = Query(...)
):
    await websocket.accept()
    rooms[room].append((websocket, username))

    try:
        while True:
            data = await websocket.receive_text()
            message = f"{username}@{room}: {data}"
            for client, _ in rooms[room]:
                await client.send_text(message)
    except WebSocketDisconnect:
        # Remove disconnected client
        rooms[room] = [c for c in rooms[room] if c[0] != websocket]
        if not rooms[room]:
            del rooms[room]
