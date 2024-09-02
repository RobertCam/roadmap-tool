from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)

# Configure Flask
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to a secure secret key

# Initialize Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)  # Initialize Migrate after db and app

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": "https://musical-broccoli-jjrwvpxwgvrhppvr-3000.app.github.dev",
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
})

# Define a function to handle preflight OPTIONS requests globally
@app.before_request
def handle_options_request():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        headers = response.headers

        headers['Access-Control-Allow-Origin'] = 'https://musical-broccoli-jjrwvpxwgvrhppvr-3000.app.github.dev'
        headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        headers['Access-Control-Max-Age'] = '86400'  # Cache preflight response for 1 day

        return response

# Define Models
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create the database
with app.app_context():
    db.create_all()

# User Registration
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = User(username=username, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'}), 201

# User Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# Routes for Strategic Initiatives
@app.route('/api/initiatives', methods=['POST'])
@jwt_required()
def add_initiative():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    new_initiative = StrategicInitiative(
        name=data['name'],
        description=data['description'],
        problem=data['problem'],
        desired_outcome=data['desired_outcome'],
        key_metrics=data['key_metrics'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d'),
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d'),
        detailed_brief_link=data.get('detailed_brief_link'),
        user_id=current_user_id
    )

    db.session.add(new_initiative)
    db.session.commit()

    return jsonify({'message': 'Strategic Initiative created successfully!'}), 201

@app.route('/api/initiatives', methods=['GET'])
@jwt_required()
def get_initiatives():
    current_user_id = get_jwt_identity()
    initiatives = StrategicInitiative.query.filter_by(user_id=current_user_id).all()
    output = []

    for initiative in initiatives:
        initiative_data = {
            'id': initiative.id,
            'name': initiative.name,
            'description': initiative.description,
            'problem': initiative.problem,
            'desired_outcome': initiative.desired_outcome,
            'key_metrics': initiative.key_metrics,
            'start_date': initiative.start_date.strftime('%Y-%m-%d'),
            'end_date': initiative.end_date.strftime('%Y-%m-%d'),
            'detailed_brief_link': initiative.detailed_brief_link,
            'projects': []
        }

        for project in initiative.projects:
            project_data = {
                'id': project.id,
                'name': project.name,
                'description': project.description,
                'problem_statement': project.problem_statement,
                'hypothesis': project.hypothesis,
                'start_date': project.start_date.strftime('%Y-%m-%d'),
                'end_date': project.end_date.strftime('%Y-%m-%d'),
                'status': project.status,
                'project_brief_link': project.project_brief_link,
                'design_board_link': project.design_board_link,
                'milestones': []
            }

            for milestone in project.milestones:
                milestone_data = {
                    'id': milestone.id,
                    'name': milestone.name,
                    'description': milestone.description,
                    'start_date': milestone.start_date.strftime('%Y-%m-%d'),
                    'end_date': milestone.end_date.strftime('%Y-%m-%d'),
                    'status': milestone.status,
                    'github_link': milestone.github_link
                }
                project_data['milestones'].append(milestone_data)

            initiative_data['projects'].append(project_data)

        output.append(initiative_data)

    return jsonify(output)

@app.route('/api/initiatives/<int:id>', methods=['GET'])
@jwt_required()
def get_initiative(id):
    current_user_id = get_jwt_identity()
    initiative = StrategicInitiative.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    initiative_data = {
        'id': initiative.id,
        'name': initiative.name,
        'description': initiative.description,
        'problem': initiative.problem,
        'desired_outcome': initiative.desired_outcome,
        'key_metrics': initiative.key_metrics,
        'start_date': initiative.start_date.strftime('%Y-%m-%d'),
        'end_date': initiative.end_date.strftime('%Y-%m-%d'),
        'detailed_brief_link': initiative.detailed_brief_link,
        'projects': []
    }

    for project in initiative.projects:
        project_data = {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'problem_statement': project.problem_statement,
            'hypothesis': project.hypothesis,
            'start_date': project.start_date.strftime('%Y-%m-%d'),
            'end_date': project.end_date.strftime('%Y-%m-%d'),
            'status': project.status,
            'project_brief_link': project.project_brief_link,
            'design_board_link': project.design_board_link,
            'milestones': []
        }

        for milestone in project.milestones:
            milestone_data = {
                'id': milestone.id,
                'name': milestone.name,
                'description': milestone.description,
                'start_date': milestone.start_date.strftime('%Y-%m-%d'),
                'end_date': milestone.end_date.strftime('%Y-%m-%d'),
                'status': milestone.status,
                'github_link': milestone.github_link
            }
            project_data['milestones'].append(milestone_data)

        initiative_data['projects'].append(project_data)

    return jsonify(initiative_data)

@app.route('/api/initiatives/<int:id>', methods=['PUT'])
@jwt_required()
def update_initiative(id):
    current_user_id = get_jwt_identity()
    initiative = StrategicInitiative.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    data = request.get_json()
    initiative.name = data['name']
    initiative.description = data['description']
    initiative.problem = data['problem']
    initiative.desired_outcome = data['desired_outcome']
    initiative.key_metrics = data['key_metrics']
    initiative.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    initiative.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
    initiative.detailed_brief_link = data.get('detailed_brief_link')

    db.session.commit()

    return jsonify({'message': 'Strategic Initiative updated successfully!'})

@app.route('/api/initiatives/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_initiative(id):
    current_user_id = get_jwt_identity()
    initiative = StrategicInitiative.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    db.session.delete(initiative)
    db.session.commit()

    return jsonify({'message': 'Strategic Initiative deleted successfully!'})

# Routes for Projects
@app.route('/api/projects', methods=['POST'])
@jwt_required()
def add_project():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    new_project = Project(
        name=data['name'],
        description=data['description'],
        problem_statement=data['problem_statement'],
        hypothesis=data['hypothesis'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d'),
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d'),
        status=data['status'],
        project_brief_link=data.get('project_brief_link'),
        design_board_link=data.get('design_board_link'),
        initiative_id=data.get('initiative_id'),
        user_id=current_user_id
    )

    db.session.add(new_project)
    db.session.commit()

    return jsonify({'message': 'Project created successfully!'}), 201

@app.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects():
    current_user_id = get_jwt_identity()
    projects = Project.query.filter_by(user_id=current_user_id).all()
    output = []

    for project in projects:
        project_data = {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'problem_statement': project.problem_statement,
            'hypothesis': project.hypothesis,
            'start_date': project.start_date.strftime('%Y-%m-%d'),
            'end_date': project.end_date.strftime('%Y-%m-%d'),
            'status': project.status,
            'project_brief_link': project.project_brief_link,
            'design_board_link': project.design_board_link,
            'initiative_id': project.initiative_id,
            'milestones': []
        }

        for milestone in project.milestones:
            milestone_data = {
                'id': milestone.id,
                'name': milestone.name,
                'description': milestone.description,
                'start_date': milestone.start_date.strftime('%Y-%m-%d'),
                'end_date': milestone.end_date.strftime('%Y-%m-%d'),
                'status': milestone.status,
                'github_link': milestone.github_link
            }
            project_data['milestones'].append(milestone_data)

        output.append(project_data)

    return jsonify(output)

@app.route('/api/projects/<int:id>', methods=['GET'])
@jwt_required()
def get_project(id):
    current_user_id = get_jwt_identity()
    project = Project.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    project_data = {
        'id': project.id,
        'name': project.name,
        'description': project.description,
        'problem_statement': project.problem_statement,
        'hypothesis': project.hypothesis,
        'start_date': project.start_date.strftime('%Y-%m-%d'),
        'end_date': project.end_date.strftime('%Y-%m-%d'),
        'status': project.status,
        'project_brief_link': project.project_brief_link,
        'design_board_link': project.design_board_link,
        'initiative_id': project.initiative_id,
        'milestones': []
    }

    for milestone in project.milestones:
        milestone_data = {
            'id': milestone.id,
            'name': milestone.name,
            'description': milestone.description,
            'start_date': milestone.start_date.strftime('%Y-%m-%d'),
            'end_date': milestone.end_date.strftime('%Y-%m-%d'),
            'status': milestone.status,
            'github_link': milestone.github_link
        }
        project_data['milestones'].append(milestone_data)

    return jsonify(project_data)

@app.route('/api/projects/<int:id>', methods=['PUT'])
@jwt_required()
def update_project(id):
    current_user_id = get_jwt_identity()
    project = Project.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    data = request.get_json()
    project.name = data['name']
    project.description = data['description']
    project.problem_statement = data['problem_statement']
    project.hypothesis = data['hypothesis']
    project.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    project.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
    project.status = data['status']
    project.project_brief_link = data.get('project_brief_link')
    project.design_board_link = data.get('design_board_link')
    project.initiative_id = data.get('initiative_id')

    db.session.commit()

    return jsonify({'message': 'Project updated successfully!'})

@app.route('/api/projects/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    current_user_id = get_jwt_identity()
    project = Project.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    db.session.delete(project)
    db.session.commit()

    return jsonify({'message': 'Project deleted successfully!'})

# Routes for Milestones
@app.route('/api/milestones', methods=['POST'])
@jwt_required()
def add_milestone():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    new_milestone = Milestone(
        name=data['name'],
        description=data['description'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d'),
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d'),
        status=data['status'],
        github_link=data.get('github_link'),
        project_id=data['project_id'],
        user_id=current_user_id
    )

    db.session.add(new_milestone)
    db.session.commit()

    return jsonify({'message': 'Milestone created successfully!'}), 201

@app.route('/api/milestones', methods=['GET'])
@jwt_required()
def get_milestones():
    current_user_id = get_jwt_identity()
    milestones = Milestone.query.filter_by(user_id=current_user_id).all()
    output = []

    for milestone in milestones:
        milestone_data = {
            'id': milestone.id,
            'name': milestone.name,
            'description': milestone.description,
            'start_date': milestone.start_date.strftime('%Y-%m-%d'),
            'end_date': milestone.end_date.strftime('%Y-%m-%d'),
            'status': milestone.status,
            'github_link': milestone.github_link,
            'project_id': milestone.project_id
        }
        output.append(milestone_data)

    return jsonify(output)

@app.route('/api/milestones/<int:id>', methods=['GET'])
@jwt_required()
def get_milestone(id):
    current_user_id = get_jwt_identity()
    milestone = Milestone.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    milestone_data = {
        'id': milestone.id,
        'name': milestone.name,
        'description': milestone.description,
        'start_date': milestone.start_date.strftime('%Y-%m-%d'),
        'end_date': milestone.end_date.strftime('%Y-%m-%d'),
        'status': milestone.status,
        'github_link': milestone.github_link,
        'project_id': milestone.project_id
    }

    return jsonify(milestone_data)

@app.route('/api/milestones/<int:id>', methods=['PUT'])
@jwt_required()
def update_milestone(id):
    current_user_id = get_jwt_identity()
    milestone = Milestone.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    data = request.get_json()
    milestone.name = data['name']
    milestone.description = data['description']
    milestone.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    milestone.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
    milestone.status = data['status']
    milestone.github_link = data.get('github_link')
    milestone.project_id = data.get('project_id')

    db.session.commit()

    return jsonify({'message': 'Milestone updated successfully!'})

@app.route('/api/milestones/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_milestone(id):
    current_user_id = get_jwt_identity()
    milestone = Milestone.query.filter_by(id=id, user_id=current_user_id).first_or_404()

    db.session.delete(milestone)
    db.session.commit()

    return jsonify({'message': 'Milestone deleted successfully!'})

# Run the application
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
