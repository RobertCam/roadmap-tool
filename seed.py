from app import app, db, User, StrategicInitiative, Project, Milestone
from datetime import datetime

# Use the application context to perform database operations
with app.app_context():
    # Clear existing data
    db.session.query(Milestone).delete()
    db.session.query(Project).delete()
    db.session.query(StrategicInitiative).delete()
    db.session.query(User).delete()
    db.session.commit()

    # Create a user
    user = User(username='testuser', password='password')  # Replace with hashed password in real scenario
    db.session.add(user)
    db.session.commit()

    # Create strategic initiatives
    initiative1 = StrategicInitiative(
        name="Improve User Experience",
        description="Focus on improving the overall user experience across the platform.",
        problem="Users find the interface clunky and unintuitive.",
        desired_outcome="A streamlined, intuitive interface that users love.",
        key_metrics="Increased user retention and satisfaction scores.",
        start_date=datetime(2024, 1, 1),
        end_date=datetime(2024, 6, 30),
        user_id=user.id
    )

    initiative2 = StrategicInitiative(
        name="Expand Market Reach",
        description="Expand into new geographic markets and user demographics.",
        problem="Current user base is limited to a narrow demographic.",
        desired_outcome="A broader, more diverse user base.",
        key_metrics="Increased market share in targeted regions.",
        start_date=datetime(2024, 3, 1),
        end_date=datetime(2024, 12, 31),
        user_id=user.id
    )

    db.session.add_all([initiative1, initiative2])
    db.session.commit()

    # Create projects
    project1 = Project(
        name="UI Overhaul",
        description="Complete redesign of the user interface.",
        problem_statement="Current UI is outdated and not user-friendly.",
        hypothesis="Redesigning the UI will increase user engagement.",
        start_date=datetime(2024, 1, 15),
        end_date=datetime(2024, 4, 15),
        status="In Progress",
        project_brief_link="http://example.com/ui-overhaul-brief",
        design_board_link="http://example.com/ui-overhaul-design",
        initiative_id=initiative1.id,
        user_id=user.id
    )

    project2 = Project(
        name="Localization",
        description="Translate and localize the platform for new markets.",
        problem_statement="Platform is currently only available in English.",
        hypothesis="Localizing the platform will attract more users in non-English speaking markets.",
        start_date=datetime(2024, 3, 1),
        end_date=datetime(2024, 8, 1),
        status="Not Started",
        project_brief_link="http://example.com/localization-brief",
        design_board_link="http://example.com/localization-design",
        initiative_id=initiative2.id,
        user_id=user.id
    )

    db.session.add_all([project1, project2])
    db.session.commit()

    # Create milestones
    milestone1 = Milestone(
        name="UI Mockups",
        description="Create initial mockups for the new UI design.",
        start_date=datetime(2024, 1, 15),
        end_date=datetime(2024, 2, 15),
        status="Completed",
        github_link="http://github.com/example/ui-mockups",
        project_id=project1.id,
        user_id=user.id
    )

    milestone2 = Milestone(
        name="Beta Testing",
        description="Conduct beta testing for the new UI.",
        start_date=datetime(2024, 3, 1),
        end_date=datetime(2024, 3, 30),
        status="In Progress",
        github_link="http://github.com/example/ui-beta-testing",
        project_id=project1.id,
        user_id=user.id
    )

    milestone3 = Milestone(
        name="Localization Setup",
        description="Set up the infrastructure for localization.",
        start_date=datetime(2024, 3, 1),
        end_date=datetime(2024, 4, 1),
        status="Not Started",
        github_link="http://github.com/example/localization-setup",
        project_id=project2.id,
        user_id=user.id
    )

    db.session.add_all([milestone1, milestone2, milestone3])
    db.session.commit()

    print("Seed data added successfully!")
