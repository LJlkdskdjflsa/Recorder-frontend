import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Auth/Login";
import {Register} from "./components/auth/Register";
import {AuthConsumer, AuthProvider} from "./context/JWTAuthContext";
import {Flex, Spinner} from "@chakra-ui/react";
import {PublicRoute} from "./components/auth/PublicRoute";
import {PrivateRoute} from "./components/auth/PrivateRoute";
import {ALLRecord as RecordListPage} from "./pages/Record/ALLRecord";
import {Detail as RecordDetailPage} from "./pages/Record/Detail";
import NavBarWithAction from "./components/navBar/NavBar";
import {TestPageJsonSchemaForm} from "./pages/Test/TestPageJsonSchemaForm";
import {Detail as TemplateDetailPage} from "./pages/Template/Detail";
import HomePage from "./pages/Home";
import {AllTemplate as TemplateListPage} from "./pages/Template/AllTemplate";


function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <AuthConsumer>
                        {
                            (auth) => !auth.isInitialized ? (
                                <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
                                    <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="green.200"
                                        color="green.500"
                                        size="xl"
                                    />
                                </Flex>
                            ) : (
                                <Routes>
                                    <Route path={"/"} element={<HomePage/>}></Route>
                                    <Route path={"/login"} element={<PublicRoute><Login/></PublicRoute>}></Route>
                                    <Route path={"/register"} element={<PublicRoute><Register/></PublicRoute>}></Route>
                                    <Route path={"/"} element={<PrivateRoute><NavBarWithAction/></PrivateRoute>}>
                                        <Route path={"/test"} element={<TestPageJsonSchemaForm/>}></Route>
                                        <Route path={"/template"}>
                                            <Route path={""} element={<TemplateListPage/>}></Route>
                                            <Route
                                                path={"/template/:templateId"}
                                                element={
                                                    <TemplateDetailPage/>
                                                }
                                            />
                                        </Route>

                                        <Route path={"/record"}>
                                            <Route path={""} element={<RecordListPage/>}></Route>
                                            <Route
                                                path="/record/:recordId"
                                                element={
                                                    <RecordDetailPage/>
                                                }
                                            /></Route>


                                    </Route>
                                    <Route path={"*"} element={<Navigate to={"/"}/>}></Route>
                                </Routes>
                            )
                        }
                    </AuthConsumer>

                </Router>
            </AuthProvider>
        </>
    );
}

export default App;
