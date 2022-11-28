import React from "react";

const Blogs = () => {
  return (
    <div className="my-8 grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center">
      <div>
        <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
          <div class="block rounded-xl bg-white p-6 sm:p-8">
            <div class="sm:pr-8">
              <h3 class="text-xl font-bold text-gray-900">
                What are the different ways to manage a state in a React
                application?
              </h3>

              <p class="mt-2 text-sm text-gray-500">
                There are four main types of state you need to properly manage
                in your React apps: Local state, Global state, Server state, URL
                state,
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
          <div class="block rounded-xl bg-white p-6 sm:p-8">
            <div class="sm:pr-8">
              <h3 class="text-xl font-bold text-gray-900">
                How does prototypical inheritance work?
              </h3>

              <p class="mt-2 text-sm text-gray-500">
                Prototype inheritance in javascript is the linking of prototypes
                of a parent object to a child object to share and utilize the
                properties of a parent class using a child class. Prototypes are
                hidden objects that are used to share the properties and methods
                of a parent class to child classes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
          <div class="block rounded-xl bg-white p-6 sm:p-8">
            <div class="sm:pr-8">
              <h3 class="text-xl font-bold text-gray-900">
                React vs. Angular vs. Vue?
              </h3>

              <p class="mt-2 text-sm text-gray-500">
                React is a UI library, Angular is a fully-fledged front-end
                framework, while Vue.js is a progressive framework. They can be
                used almost interchangeably to build front-end applications, but
                they’re not 100 percent the same
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
          <div class="block rounded-xl bg-white p-6 sm:p-8">
            <div class="sm:pr-8">
              <h3 class="text-xl font-bold text-gray-900">
                What is a unit test? Why should we write unit tests?
              </h3>

              <p class="mt-2 text-sm text-gray-500">
                A unit test is a way of testing a unit - the smallest piece of
                code that can be logically isolated in a system.The main
                objective of unit testing is to isolate written code to test and
                determine if it works as intended
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
