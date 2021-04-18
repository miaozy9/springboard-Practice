from flask import Flask, request, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres:///blogly"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def root():
    return redirect("/users")


@app.route('/users')
def user_list():
    users = User.query.all()
    return render_template('users/index.html', users = users)

@app.route('/users/new', methods=["GET"])
def show_form():
    return render_template('users/newUser.html')

@app.route('/users/new', methods=["POST"])
def create_user():
    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        image_url=request.form['image_url'] or None)
    db.session.add(new_user)
    db.session.commit()
    return redirect("/users")


@app.route('/users/<int:user_id>')
def users_show(user_id):

    user = User.query.get_or_404(user_id)
    return render_template('users/info.html', user=user)

@app.route('/users/<int:user_id>/edit',methods=["GET"])
def edit_form(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('users/edit.html', user=user)

@app.route('/users/<int:user_id>/edit',methods=["POST"])
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()
    return redirect("/users")

@app.route('/users/<int:user_id>/delete',methods=["POST"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/users")




###post

@app.route('/users/<int:user_id>/posts/new',methods=["GET"])
def create_post_form(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('posts/newPost.html', user=user)

@app.route('/users/<int:user_id>/posts/new',methods=["POST"])
def create_post(user_id):
    user = User.query.get_or_404(user_id)
    new_post = Post(title=request.form['title'],
                    content=request.form['content'],
                    user=user)
    db.session.add(new_post)
    db.session.commit()
    return redirect(f"/users/{user_id}")

@app.route('/posts/<int:post_id>')
def posts_show(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('posts/show.html', post=post)


@app.route('/posts/<int:post_id>/edit',methods=["GET"])
def edit_post_form(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('posts/edit.html', post=post)

@app.route('/posts/<int:post_id>/edit',methods=["POST"])
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{post.user_id}")

@app.route('/posts/<int:post_id>/delete',methods=["POST"])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect(f"/users/{post.user_id}")
