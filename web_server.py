
from flask import Flask, Response,request,send_from_directory

app = Flask(__name__)
@app.route('/')
def indexFile():
    	return send_from_directory("","index.html")
@app.route('/sw.js')
def swjs():
    	return send_from_directory("","sw.js",mimetype="application/javascript")
@app.route('/<name>')
def staticFile(name):
    	return send_from_directory("",name)
@app.route('/js/<name>')
def jsFile(name):
    	return send_from_directory("js",name)
@app.route('/css/<name>')
def cssFile(name):
    	return send_from_directory("css",name)
@app.route('/icons/<name>')
def iconsFile(name):
    	return send_from_directory("icons",name)
# import sys

# class __redirection__:
# 	def __init__(self):
# 		self.closed=False
# 		return
# 	def write(self, output_stream):
# 		return
# 	def flush(self):
# 		return
        
        
def start_server():
	# r_obj=__redirection__()
	# sys.stderr=r_obj
	app.run(host='0.0.0.0', port=8000, debug=True, threaded=True)
# threading.Thread(target=start_server).start()
start_server()