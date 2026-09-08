import http.server
import os
import pathlib
import threading

# Serve this folder whatever directory the command was run from.
os.chdir(pathlib.Path(__file__).parent)

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, *args):
        pass

def serve(port):
    http.server.ThreadingHTTPServer(("127.0.0.1", port), NoCache).serve_forever()

# 8767 is the same files on a different origin, so one test can call
# window.open from code that does not belong to the page.
threading.Thread(target=serve, args=(8767,), daemon=True).start()
print("harness on http://127.0.0.1:8766/run.html")
serve(8766)
