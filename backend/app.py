from flask import Flask, request, jsonify,redirect
from flask_cors import CORS
import string
import hashlib
import string

app=Flask(__name__)
CORS(app)

BASE62_ALPHABET = string.digits + string.ascii_lowercase + string.ascii_uppercase

valdict = {}

def encode_base62(num):
    
    if num == 0:
        return BASE62_ALPHABET[0]
    
    base62_str = ""
    while num:
        num, rem = divmod(num, 62)
        base62_str = BASE62_ALPHABET[rem] + base62_str
    return base62_str

def generate_short_url(url):
    url_hash = hashlib.sha256(url.encode('utf-8')).hexdigest()
    hash_int = int(url_hash[:16], 16) 

    return encode_base62(hash_int)

@app.route('/add', methods=['POST'])
def add():
    try:
        url = request.json.get('url')
        if url:
            
            short_url = generate_short_url(url)
            
           
            valdict[short_url] = url
            
           
            return jsonify({'short_url': short_url}), 200
        
        return jsonify({'error': 'Invalid URL'}), 400

    except Exception as e:
        
        print(f"Error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500
  
@app.route('/<surl>')
def get_url(surl):
    try:
        if(valdict.get(surl)!=None):
            return redirect(valdict[surl])
        return "url not found",500
    except:
        return "error",500

        

if __name__=="__main__":
    app.run(debug=True)