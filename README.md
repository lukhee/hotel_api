# Hotel_api

The above code is an api created for a client operating an hospitality for tourists in which an accommodation can be provided.

# Front_end/api Operation


#### List of operations to perform by clients/tourist

- Enter the number of guests and the number of night to spend 
- List of available rooms is sent back base on the input valuse by the clients
- Client select a room and and and ID will be sent back to the client for room verification


#### List of operations to perform by the admin

- Admin can create a package, 
- Admin can delete a package by ID, 
- Admin can Reads all package, 
- Admin can update package by ID, 


# Tools 


#### Tool/package requirements

- Node.js (Express)
- ~~postgress DB~~  **mongoDB**
- ~~Websocket~~ **socket.io**
- Testing 
  - Unit Testing
  - Integration Testing
- Chrome ~~websocket~~ **socket** extension tool
  -https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?hl=en
  
#### Tool/package accomplished/achieved tools

- Node.js (Express)
- **mongoDB**
- **socket.io**
- Testing 
  - Unit Testing (auth middleware )
  - Integration Testing (for the package middleware only0
- Chrome **socket** extension tool
  - https://chrome.google.com/webstore/detail/socketio-tester/cgmimdpepcncnjgclhnhghdooepibakm?hl=en
  
# USING SOCKET.IO TESTING TOOL
-install package : https://chrome.google.com/webstore/detail/socketio-tester/cgmimdpepcncnjgclhnhghdooepibakm?hl=en  
-EVENT TO LISTEN TO: **Booking**  
-URL : localhost:3040    
 -~~ws://localhost:3040/~~    
-Goto postman *POST*: localhost:3040/api/booking/room_request     
    data = {   
	 "request_data": {   
        "no_of_guest": 5,  
        "check_in_date": "Tuesday, 31 March 2020",     
        "check_out_date": "Tuesday, 31 March 2020"  
    },  
    "package_id": "selected **ID** from avove"  
}
  
  
# Testing APIs  / POSTMAN


#### BOOKING ROUTES
#### Client 
- Request   
  **POST**: localhost:3040/api/booking    
    data = {    
      "no_of_guest": 3,  
      "check_in_date": "Tuesday, 31 March 2020",   
      "check_out_date": "Tuesday, 31 March 2020"  
    }  
    
    response: List of Rooms and Client select one room by copying the ID = ID  
      
- SELECT AND CREATE   
**POST**: localhost:3040/api/booking/room_request    
    data = {   
	 "request_data": {   
        "no_of_guest": 5,  
        "check_in_date": "Tuesday, 31 March 2020",     
        "check_out_date": "Tuesday, 31 March 2020"  
    },  
    "package_id": "selected **ID** from avove"  
}  
    
    response: success Message with request data containing the client **ID**  
    
#### Admin 
- CHECK ALL BOOKED ROOMS **GET**: localhost:3040/api/booking/booked_rooms  
    response: List of Booked Rooms  
    
- CHECK ALL BOOKED ROOMS BY ID **GET**:localhost:3040/api/booking/:booked_id  
    response: List of Booked Rooms  
    
  

#### PACKAGE ROUTES
#### admin 
- Create Package  
**POST**: localhost:3040/api/package   
    data = {  
	  "type": "Mixed Double Room",  
	  "genders": "male and female",  
	  "no_of_beds": "4",  
	  "cost": 40000  
}
      
    response: object of package created 

- GET all available package created   
**GET**: localhost:3040/api/package   
    
    response: list of packages creat available
    
- Package Update with ID     
  **PUT**: localhost:3040/api/package/:packageID   
    data ={   
	"type": "Updated Testing Dorm Room",   
	"genders": "Male and Female",  
	"no_of_beds": "4",  
	"cost": 40000  
}  
      
    response: object of of updated package   
    

- DELETE PACKAGE BY ID  **DELETE**: localhost:3040/api/package/:packageID 
    
    response: Success message   
