import React from "react";

const About = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div>
        <div className="mx-auto max-w-screen-xl my-2 py-2 px-4 lg:px-8 lg:py-4">
          <div className="max-w-3xl">
            <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Resale Your Used Books
              <span class="sm:block"> With Bookroy</span>
            </h1>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
              <img
                alt="Book"
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-16">
              <article className="space-y-4">
                <p>
                  Are you a book lover? you love book and you have lot's of book
                  collection?
                </p>

                <p>
                  You can sell your unused books with bookroy and can earn extra
                  cash with it
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
