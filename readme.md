# Cloner le projet

git clone https://github.com/Taratra-RD/test-big-dev-company-back.git

# Se déplacer vers le répertoire du projet

cd test-big-dev-company-back

# Installer les dependences

npm install

# Lancer l'application en mode production

npm start

# API posts

http://localhost:5000/api/post
{
"title":"New post",
"content":"Just a post content, normally replaced with lorem ipsum!",
"user_id":"1"
}

# API comments

http://localhost:5000/api/comment
{
"content":"Just a comment content, normally remplaced with lorem ipsum!",
"post_id":"1"
}

# API likes

http://localhost:5000/api/like/:post_id
{
"user_id":"1"
}

# API users

http://localhost:5000/api/user/signin
http://localhost:5000/api/user/signup
{
"username":"admin",
"password":"0000"
}

# API historic

http://localhost:5000/api/user/historic
