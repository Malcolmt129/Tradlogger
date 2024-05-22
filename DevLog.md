## April 18, 2024
    Working on finding out what I need to do to make certain react components work in expected ways. One of the problems that I ran into his how to work certain parts of the UI. I was trying to change the way the table looks. I started at the root most component which may be the issue. I think agood way to think about it, is that the parent component is is the first plate in the stack of dishes. The child is laid ontop of parent. So this   means that you have to start your search of what component to change from the top of "stack" first. 


## April 21, 2024
    Today I worked on getting the information from the backend to the frontend. Basically what I did was set the proxy server field in the          package.json file in the client folder. For the backend I just applied the proper route for it. May need to fine tune the routes later but that is not an issue as of now. Once I got that part set up I created a state variable and added a useEffect to change the state variable. I use the fetch   function to update the state variable and map each of those "trades" to a table row component and now I am able to see each of my trades on the     UI.
