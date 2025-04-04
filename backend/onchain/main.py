import uvicorn

if __name__ == "__main__":
    print("The server started in http://localhost:8000\n")
    print("The Docs in http://localhost:8000/docs\n")
    uvicorn.run("app.app:app", host="0.0.0.0", port=8000, reload=True)
