import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./components/Auth/Register";
import {AuthConsumer, AuthProvider} from "./context/JWTAuthContext";
import {Flex, Spinner} from "@chakra-ui/react";
import {PublicRoute} from "./components/Auth/PublicRoute";
import {PrivateRoute} from "./components/Auth/PrivateRoute";
import {RecordList} from "./pages/Record/RecordList";
import {RecordDetail} from "./pages/Record/RecordDetail";
import NavBarWithAction from "./components/NavBar/NavBar";
import {TestPage} from "./pages/TestPage";
import {TemplateList} from "./pages/Template/TemplateList";
import {TemplateDetail} from "./pages/Template/TemplateDetail";


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
                                    <Route path={"/login"} element={<PublicRoute><Login/></PublicRoute>}></Route>
                                    <Route path={"/register"} element={<PublicRoute><Register/></PublicRoute>}></Route>
                                    <Route path={"/"} element={<PrivateRoute><NavBarWithAction/></PrivateRoute>}>
                                        <Route path={"/"} element={<RecordList/>}></Route>
                                        <Route path={"/test"} element={<TestPage/>}></Route>
                                        <Route path={"/template"}>
                                            <Route path={""} element={<TemplateList/>}></Route>
                                            <Route
                                                path={"/template/:templateId"}
                                                element={
                                                    <TemplateDetail/>
                                                }
                                            />
                                        </Route>
                                        <Route path={""} element={<RecordList/>}></Route>

                                        <Route path={"/record"}> <Route
                                            path="/record/:recordId"
                                            element={
                                                <RecordDetail/>
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
