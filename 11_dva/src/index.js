// 1. import react
import React from "react"

// 2. import dva
import dva from "dva";

// 3. import Counter's model and route
import ModelCounter from "./models/Counter"
import RouteCounter from "./routes/Counter"

// 4. create dva instance.
const app = dva();

// 5. add Counter's model to dva
app.model(ModelCounter);

// 6. add Counter's route to dva
app.router(() => <RouteCounter/>);

// 7. Start dva
app.start('#app');



















// import React from "react"
// import dva from "dva";
// import dynamic from "dva/dynamic"
//
// // 1. create dva instance.
// const app = dva();
//
// // 2. dynamic load Counter's model and route
// const DynamicCounter = dynamic({
//     app,
//     models: () => [
//         import('./models/Counter'),
//     ],
//     component: () => import('./routes/Counter'),
// })
//
// // 3. router
// app.router(() => <DynamicCounter/>);
//
//
// // 4. Start dva
// app.start('#app');