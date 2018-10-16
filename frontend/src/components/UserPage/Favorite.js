import React, { Component } from 'react';
import BasePage from "./BasePage";

export default class Favorite extends BasePage {
    render() {
        return (
            <div ref="root">
                <h1>Favorite component</h1>
            </div>
        );
    }
}