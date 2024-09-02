from app import db, User, bcrypt, app

# Wrap your operations inside the application context
with app.app_context():
    # Delete all users (optional, if you want to clear the table first)
    User.query.delete()
    db.session.commit()

    # Create a new user with a properly hashed password
    hashed_password = bcrypt.generate_password_hash('12345678').decode('utf-8')
    new_user = User(username='testuser', password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    print("User created successfully with a hashed password.")
