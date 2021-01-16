from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

RESPONSES_KEY = "responses"

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)




@app.route("/")
def show_start():
    return render_template("start.html", survey=survey)


@app.route("/begin", methods=["POST"])
def start_survey():
    session[RESPONSES_KEY] = []
    """wipe out session storage"""
    return redirect("/questions/0")


@app.route("/answer", methods=["POST"])
def handle_question():
    choice = request.form['answer']

    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(survey.questions)):
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")


@app.route("/questions/<int:qid>")
def show_question(qid):
    responses = session.get(RESPONSES_KEY)

    if (responses is None):
        flash("Secret questions! Hit the start button first!")
        return redirect("/")

    if (len(responses) != qid):
        flash(f"Be patient! Invalid question id: {qid}.")
        return redirect(f"/questions/{len(responses)}")

    survey_question = survey.questions[qid]
    return render_template(
        "question.html", qe=survey_question)


@app.route("/complete")
def complete():
    responses = session[RESPONSES_KEY]
    return render_template("complete.html", survey=survey, responses=responses)