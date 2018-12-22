# **Tripster**  :round_pushpin: :airplane:
## Description

Tripster is an amazing mobile software for travelers, available on both android and iOS. The main idea of this application is to ease the workflow of recording and sharing your trips with your friends or with people you are only about to meet and for travelers who want to find places which are never mentioned in the city guides. Using the application you can create new “trip”, - a stack of interesting places during your journey gathered together, share your experience along with your route, share your comments and photos so anyone who finds your “trip” (if you share it) can experience everything by themselves. If you are new to app and you dont have someone to follow yet you can simply find the complete “trip” in the city you’ve never been to so you wouldn’t be lost while discovering new interesting places or sightseeing without paying someone to show you the way!

## Usage
Application consists of 4 main screens, News Feed, Explore, Create Trip and Profile.

1. **News Feed** - (_**still under development**_) - shows recent activity of the people we follow
2. **Explore** - (_**beta**_) - explore new places or find people you know using explore screen

3. **Create Trip** - consists of map and _Start Tour_ button. Clicking on _Start Tour_ buton you are telling the application that your trip has begun and you are ready to share your experience! Now if you are staying on one place for more than 10 min (_for development that time is set for 6 sec_) you wil be asked to add the place you are at to your trip, after confirming you are able to leave comment, photo and rate this place. Also at anymoment you can press on _Stop Tour_ or _Add POI_. 
    - _Add POI_ is a manual mechanism with the same idea as adding POI after some time but whenever you want it to be added, you are promted with the same form having only one difference, you can choose manually one of the nearest POI(provided by the google) or create the new one yourself. You are being asked to leave comment, add photo and rate this place. 
    - _Stop tour_, as you can guess, stops tour, at that time application gathers all the added POI's, makes a complete Trip out of it and pushes that right to the database:)
4. **Profile** - this is the place you can recall your memories browsing your last trips and enjoying it on more time from time to time ;)
At the top, you can see some basic user information:
    - User name
    - Profile Image
    - Counter for amount of posts(each post is represented as a single trip)
    - Counters showing how many people you are following and how many people you are being followed by
    - Short user description

    Right under the user profile information header you can see four tabs, short description of each tab:
    1. User trips represented as a single cover photo, for faster browsing, clicking on one of them opens the trip, showing all the information needed, map with each POI where user stoped, also the route between the POI so you know how to get from one POI to another and photos from this trip (represented as a carousel where at first place there is a map and all other items are photos from the trip)
    2. User trips represented as a single trips with full description(described above), scrolling down you are navigating to the next trip.
    3. Here you can see trips you liked and desided to save.
    4. This tab shows trips which were made with the people you know. Trips there appears only when some one tag you on their trips

# How to run
1. Clone this repo and run `npm i` in the _tripster_ directory
2. Download ngrok, after downloading run it with _http 8873_ parameteres (example: `./ngrok http 8873`).
3. You will be shown your tunnel address (Forwarding                    _http://TUNNEL_ADDRESS.ngrok.io -> localhost:8873_), now you need to copy **TUNNEL_ADDRESS** and change it in **./src/tunnel_address.js**.
4. Download Expo on your mobile device.
5. Run expo in _tripster_ directory `expo start --tunnel`. `--tunnel` param enables vpn so you dont need to be in the same network to connect your device with your local machine. Known isues: if your tunnel is falling back to often and your are not able to create tounel connection try logginig in expo account using console. Search to find out how to do it.
6. Run server with `node ./api/sercer.js` in _tripster_ directory.
7. Scan the provided QR with your mobile device:
    - __iOS__ : Just open camera and point it on QR, wait untill shown notification asking if you want to open the Expo application. 
    - __Android__ : Scann QR with scann button in Expo application.
8. Wait for Expo building and downloading __Tripster__ app.