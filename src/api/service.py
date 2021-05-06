from api.models import db, User, Bird_Capture, Audio_Favorite

class Service:

# --------------------------- Captures Service ------------------------------------------

    def get_user_captures(user_id):
        
        # Get from the list of users, the one that has the id from the parameter
        user = User.query.get(user_id)
        if user is None:
            raise APIException('User not found', status_code=404)

        # Return all the captures for the specific id
        userCaptures = Bird_Capture.query.filter_by(user_id=user_id).all()

        # Serialize the object in a JSON format
        userCaptures = list(map(lambda x: x.serialize(), userCaptures)) 

        return userCaptures

    def get_public_captures():
   
        public_captures = Bird_Capture.query.filter_by(privacy=True).all()
        public_captures = list(map(lambda x: x.serialize(), public_captures)) 
            
        return public_captures


# --------------------------- Favorites Service ------------------------------------------

    def get_favorites(user_id):
        
        user = User.query.get(user_id)
        if user is None:
            raise APIException('User not found', status_code=404)

        # Return all the favorites of the particular id
        audio_favorites = Audio_Favorite.query.filter_by(user_id=user_id).all()

        # Serialize the object in a JSON format
        audio_favorites = list(map(lambda x: x.serialize(), audio_favorites)) 

        return audio_favorites