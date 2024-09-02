from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

db = SQLAlchemy()
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    initiatives = db.relationship('StrategicInitiative', backref='user', lazy=True)
    projects = db.relationship('Project', backref='user', lazy=True)
    milestones = db.relationship('Milestone', backref='user', lazy=True)

class StrategicInitiative(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    problem = db.Column(db.Text, nullable=False)
    desired_outcome = db.Column(db.Text, nullable=False)
    key_metrics = db.Column(db.String(200), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    detailed_brief_link = db.Column(db.String(200))
    projects = db.relationship('Project', backref='initiative', lazy=True)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    problem_statement = db.Column(db.Text, nullable=False)
    hypothesis = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    project_brief_link = db.Column(db.String(200))
    design_board_link = db.Column(db.String(200))
    initiative_id = db.Column(db.Integer, db.ForeignKey('strategic_initiative.id'), nullable=True)
    milestones = db.relationship('Milestone', backref='project', lazy=True)

class Milestone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    github_link = db.Column(db.String(200))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
