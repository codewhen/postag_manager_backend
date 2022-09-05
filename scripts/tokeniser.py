# import sys
# import subprocess

# # implement pip as a subprocess:
# subprocess.check_call([sys.executable, '-m', 'pip', 'install', 
# 'nltk'])
import json
from nltk.tokenize import WhitespaceTokenizer
word_tokenized = WhitespaceTokenizer().tokenize("মাকে যদি কয়,  \" শুবলৈ যাওক \"  তেন্তে বিলি শুই যায়")
output = ([words for words in word_tokenized])
print(json.dumps({"output": output,}))
