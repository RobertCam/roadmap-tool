from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
