import React from 'react';

function Contact() {
  return (
    <div className="relative w-full h-screen">
      <img
        src="images/contact.jpg"
        alt="Customer Service"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div
        className="absolute inset-0 flex flex-col font-serif text-[#2C2C47] 
                  px-4 sm:px-16 md:px-28 py-8 sm:py-16 md:py-24 -mt-4"
      >
        <h2 className="text-3xl md:text-5xl">CUSTOMER SERVICE</h2>
        <div className="mt-16 text-lg space-y-8">
          <div>
            <b className="text-3xl">Chat:</b> <br />
            Mon-Sat: 9:00 - 18:00
          </div>
          <div> 
            <b className="text-3xl">Facebook:</b> <br />
            FashionXCare
          </div>
          <div>
            <b className="text-3xl">X:</b> <br />
            @FashionXCare
          </div>
          <div>
            <b className="text-3xl">Instagram:</b> <br />
            @FashionXCare
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
