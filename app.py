from flask import Flask, render_template, redirect
from flask import request
import time

app = Flask(__name__)


# Routes

@app.route('/', methods=['POST','GET'])

def root():
        return render_template('sudoku_diffuculty.html')

@app.route('/sudoku', methods=['POST','GET'])
def game():
    sizes = {"6": 6, "9":9, "12":12 }
    if request.method == "GET":
        return redirect('/')

    if request.method == "POST":
        print(request.form)
        size = request.form['Size']
        nums = sizes[size]
        return render_template ('sudoku_board.html', nums = nums)

@app.route('/startover', methods=['POST','GET'])
def startover():
    if request.method == "GET":
        return render_template ('sudoku_startover.html')

    if request.method == "POST":
        return "Oops the page is under construction. TryAgain Later"
        #return render_template ('sudoku_board.html')



# Listener

if __name__ == "__main__":

    #Start the app on port 3000, it will be different once hosted

    app.run(port=3000, debug=True)