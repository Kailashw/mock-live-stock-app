# Live Stocks App
 A “single page” (SPA) app to display live stock data. Below are the essential data points that we need to show along with certain client requirements.

Project Live at : [https://mock-live-stock-app.web.app/](https://mock-live-stock-app.web.app/)
## Problem Statement 

Your app should subscribe for updates via WebSockets 
```Server url: ws://stocks.mnet.website```

Updates (WebSocket messages) will be provided in the following form:
```
[ [ name, price], [ name, price] … ]
```
Each update will contain 0 or more name/price pairs. You may assume that update messages will have no more than 10 name/price pairs.

### Example update handler that logs to console:

```
function handleUpdateMessage(data) {
  	data.forEach(([name, price]) => console.log(`${name}: ${price}`));
}
```

### GOALS
* Fulfill client requirements mentioned above
* Use a graphing library to showcase live tracking of a chosen stock
* Optionally, add UI enhancements you feel the app should have, for eg. Sparklines, historical data or anything you feel helps improve data visualization or interaction
* Deploy the application and share the code with us in a public github repository
* Mention what you have built in the repo Readme file

## Available Scripts

In the project directory, you can run:

 ```
 npm install 
 ```
 followed by
 ```
 npm start
 ```

The later command Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
