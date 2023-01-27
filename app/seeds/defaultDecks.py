from app.models import db, DefaultDeck, environment, SCHEMA

def seed_default_deck():
    default = DefaultDeck(card_art="https://dudemastersongbucket.s3.amazonaws.com/card+images/istockphoto-157772536-170667a.jpg")

    db.session.add(default)
    db.session.commit()
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_default_deck():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.default_deck RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM default_deck")
        
    db.session.commit()