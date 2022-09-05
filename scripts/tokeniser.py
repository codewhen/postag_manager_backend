import sys
# import subprocess

# # implement pip as a subprocess:
# subprocess.check_call([sys.executable, '-m', 'pip', 'install', 
# 'nltk'])
import json
from nltk.tokenize import WhitespaceTokenizer
input = sys.argv[1]
word_tokenized = WhitespaceTokenizer().tokenize(input)
output = ([words for words in word_tokenized])
print(json.dumps({"output": output,}))
