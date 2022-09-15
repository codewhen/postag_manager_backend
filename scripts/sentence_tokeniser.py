import sys
# import subprocess

# # implement pip as a subprocess:
# subprocess.check_call([sys.executable, '-m', 'pip', 'install', 
# 'nltk'])
import json
from nltk.tokenize import sent_tokenize
from string import punctuation
input = sys.argv[1]
sentence_tokenized=[words for words in sent_tokenize(input) if words not in punctuation]
output = ([words for words in sentence_tokenized])
print(json.dumps({"output": output,}))
