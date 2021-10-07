from flask import *
import datetime as dt
import json

app = Flask(__name__)
app.secret_key = "123"
app.permanent_session_lifetime = dt.timedelta(minutes = 5)

@app.route("/", methods = ["POST", "GET"])
def home():
    if request.method == "POST":
        session.permanent = True
        user = request.form["nm"]
        session["user"] = user
        return redirect(url_for("user"))
    else:
        if "user" in session:
            return redirect(url_for("user"))
            
        return render_template("index.html")   


@app.route("/user", methods = ["POST", "GET"])
def user():
    if "user" in session:
        user = session["user"]
        try:
            f = open("{user}'s likes.json".format(user = user), "r")
            data = json.load(f)
            f.close()
            newLikes = data["likes"]
            f = open("{user}'s likes.json".format(user = user), "w")
            json.dump(data, f, ensure_ascii = False, indent = 4)
            f.close()
        except:
            defaultLikes = { "likes" : 0 }
            data = json.dumps(defaultLikes, ensure_ascii=False, indent=4)
            with open("{user}'s likes.json".format(user = user), "w") as f:
                f.write(data)
                f.close
                newLikes = data
            return render_template("user.html", user = user)
    
        if request.method == "POST":
            f = open("{user}'s likes.json".format(user = user), "r")
            data = json.load(f)
            f.close()
            data["likes"] += 1
            newLikes = data["likes"]
            f = open("{user}'s likes.json".format(user = user), "w")
            json.dump(data, f, ensure_ascii = False, indent = 4)
            f.close()
            return render_template("user.html", user = user, likes = newLikes)
                
        return render_template("user.html", user = user, likes = newLikes)
    else:
        return render_template("index.html")

@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("You have logged out", "info")
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug = True)