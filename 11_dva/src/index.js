import React from "react"
import dva from "dva";
import modelCounter from "./models/Counter"
import Counter from "./routes/Counter"

const app = dva();

app.model(modelCounter);

// 4. Router
app.router(() => <Counter/>);

// 5. Start
app.start('#app');