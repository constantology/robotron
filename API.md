# Robot wars API documentation

## Common

the definitions here are used throughout the document

### Enums

```

    CARDINAL_COMPASS_POINT_ENUM = enum(E, N, S, W);

    ENDPOINT_RELEASE_ENUM       = enum(stable, beta, alpha);

    ENDPOINT_VERSION_ENUM       = enum(v0.0.1, v0.0.2, ..., vN.N.N);

    HTTP_STATUS_ENUM            = enum(100, ..., 599);

    INSTRUCTION_ENUM            = enum(L, M, R);

```

### DefaultDRO (Data Request Object)

```

    var DefaultDRO = {
       version : String|ENDPOINT_VERSION_ENUM  // version of api endpoint
    };

```

### DefaultDTO (Data Transfer Object)

```

    var DefaultDTO = {
    	data    : EndpointVO,       // the data from the result of the request — this will be endpoint specific
    	links   : LinksVO,          // navigable links related to the current request, e.g. next, prev, self, etc, etc...
    	params  : RequestParamsVO,  // the data request object (DRO) as interpreted by the application for this response
    	query   : RequestQueryVO,   // the data request object (DRO) as interpreted by the application for this response
    	release : ENDPOINT_RELEASE_ENUM,
    	status  : StatusVO          // the status of the response,
    	version : ENDPOINT_VERSION_ENUM
    };

```

#### LinksVO (Value Object)

```

    var LinksVO = {
    };

```

#### StatusVO (Value Object)

```

    var StatusVO = {
    	httpStatus : HTTP_STATUS_ENUM, // the http status of the response
    	success    : Boolean           // whether or not the request was successful
    };

```

----------

## Arena

### Request - POST

#### ArenaDRO (Data Request Object)

#### Expected Status Codes:
- 200 - Successful
- 400 - Too big/small

```

    ArenaDRO extends DefaultDRO = {
	    length : Integer,
	    width  : Integer
	};

```

##### examples

`/api/stable/arena` => returns a token that will be used to reference the specific arena that was created

##### Headers: NONE

##### Body (form-data):

```

   length=5
   width=5

```

----------

### Response

#### ArenaDTO (Data Transfer Object)

```

    ArenaDTO extends DefaultDTO = {
        data : ArenaVO
    };

```

#### ArenaVO (Value Object)

```

    ArenaVO = {
        id : String(GUID)
    };

```

##### examples

##### ArenaDTO

```
   POST /api/stable/arena

   FORM-DATA:
   length=5&width=5

```


```

    {
        data    : {
            id : 'c6c77532fff94e404a17cb2970f97901'
        },
        release : 'stable',
        version : 'v0.0.1',
        status  : {
            httpStatus : 200,
            success    : true
        }
    }

```

----------

## Robot

### Request - POST

#### RobotDRO (Data Request Object)

```

    RobotDRO extends DefaultDRO = {
        position     : RobotPositionVO,
        instructions : INSTRUCTION_ENUM[]
	};

```

```

    RobotPositionVO = {
        x         : Integer,
        y         : Integer,
        direction : CARDINAL_COMPASS_POINT_ENUM
	};

```

##### Headers

```

   Content-Type: application/json
   // we treat the arena as a type of CSRF Token, hence passing its ID in the header
   X-CSRF-Token: String(GUID)

```

##### Expected Status Codes:
- 200 - Successful
- 400 - Invalid Cardinal point/Instruction/Location

##### examples

`/api/stable/robot` => obtains the robot at a given position, for a specific arena, performs the set of instruction given on said robot and returns the new location of the robot

###### Body (JSON):

```

   {
       position     : {
           x         : 0,
           y         : 0,
           direction : 'N'
       },
       instructions : ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']
   }

```

----------

### Response

#### RobotDTO (Data Transfer Object)

```

    RobotDTO extends DefaultDTO = {
        data : {
            position : RobotPositionVO // same as RobotPositionVO in the above request
        }
    };

```

##### examples

##### RobotDTO

```
   POST /api/stable/robot

   REQUEST-HEADERS:
   Content-Type: application/json
   X-Arena-Id: c6c77532fff94e404a17cb2970f97901

   REQUEST-PAYLOAD:
   {
       "position"     : {
           "x"         : 0,
           "y"         : 0,
           "direction" : "N"
       },
       "instructions" : ["L", "M", "L", "M", "L", "M", "L", "M", "M"]
   }

```


```

    {
        data    : {
            position : {
                x        : 1,
                y        : 3,
               direction : 'N'
            }
        },
        release : 'stable',
        version : 'v0.0.1',
        status  : {
            httpStatus : 200,
            success    : true
        }
    }

```
