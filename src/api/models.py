from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), unique=False, nullable=False)
    last_name = db.Column(db.String(50),  unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    bio = db.Column(db.String(500), unique=False, nullable=False)
    bird_capture = db.relationship('Bird_Capture', backref='user', lazy=True) # One to Many
    audio_favorite = db.relationship('Audio_Favorite', backref='user', lazy=True) # One to Many

    def __repr__(self):
        return '<User %r>' % self.first_name

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email, 
            "bio":self.bio
            # do not serialize the password, its a security breach
        }
    
    def getAll():
        all_users = User.query.all()
        all_users = list(map(lambda x: x.serialize(), all_users))
        return all_users

    # db.session tells the class what database session to use to introspect and determine attribute data types.
    def deleteUser(id):
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()

class Bird_Capture(db.Model):
    __tablename__ = 'bird_capture'
    id = db.Column(db.Integer, primary_key=True)
    en = db.Column(db.String(50), unique=False, nullable=False) # English name
    cnt = db.Column(db.String(50), unique=False, nullable=False) # Country
    loc = db.Column(db.String(200), unique=False, nullable=False) # Location
    time = db.Column(db.String(50), unique=False, nullable=False) # Time the bird was captured
    rmk = db.Column(db.String(500), unique=False, nullable=False) # Description
    privacy = db.Column(db.Boolean(), unique=False, nullable=False) # public True/False
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) # ID to wich this bird capture belongs

    def __repr__(self):
        return '<Bird_Capture %r>' % self.en

    def serialize(self):
        user = User.query.get(self.user_id)
        return {
            "id": self.id,
            "en": self.en,
            "cnt": self.cnt,
            "loc": self.loc,
            "time": self.time,
            "rmk": self.rmk,
            "privacy": self.privacy,
            "author": user.first_name + " " + user.last_name
            # do not serialize the password, its a security breach
        }
    
    def getAll():
        all_captures = Bird_Capture.query.all()
        all_captures = list(map(lambda x: x.serialize(), all_captures))
        return all_captures

    # db.session tells the class what database session to use to introspect and determine attribute data types.
    def deleteCapture(id):
        bird_capture = Bird_Capture.query.get(id)
        db.session.delete(bird_capture)
        db.session.commit()

class Audio_Favorite(db.Model):
    __tablename__ = 'audio_favorite'
    id = db.Column(db.Integer, primary_key=True)
    url_sound = db.Column(db.String(200), unique=False, nullable=False) # mp3 bird sound
    bird_id = db.Column(db.String(50), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    
    def __repr__(self):
        return '<Audio_Favorite %r>' % self.en

    def serialize(self):
        return {
            "id": self.id,
            "url_sound": self.url_sound,
            "bird_id": self.bird_id
            # do not serialize the password, its a security breach
        }