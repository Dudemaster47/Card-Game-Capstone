from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Guest', email='guest@aa.io', password='password', profileImg='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png')
    samus = User(
        username='Samus', email='samus@aa.io', password='password', profileImg='https://en.wikipedia.org/wiki/Samus_Aran#/media/File:Samus_Aran.png')
    mario = User(
        username='Mario', email='mario@aa.io', password='password', profileImg='https://mario.nintendo.com/static/fd723b2893d4d2b39ef71bfdb4e3329c/579b4/mario-background.png')

    db.session.add(demo)
    db.session.add(samus)
    db.session.add(mario)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()