export default function Profile() {
    return (
        <div class="flex flex-col min-h-screen">
        <div class="" style={{backgroundColor: "#111"}}>
          <div class="p-5 border-b border-gray-700 flex items-center justify-between">
            
            <button class="border border-gray-600 text-gray-600 px-4 py-2 rounded-full inline-flex items-center hover:bg-gray-600 hover:text-white">
            <svg class="w-5 h-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.426,11.095l-17-8c-0.35-0.163-0.763-0.112-1.061,0.133C3.066,3.473,2.937,3.868,3.03,4.242L4.969,12L3.03,19.758 c-0.094,0.374,0.036,0.77,0.335,1.015C3.548,20.923,3.772,21,4,21c0.145,0,0.29-0.031,0.426-0.095l17-8 C21.776,12.74,22,12.388,22,12S21.776,11.26,21.426,11.095z M5.481,18.197L6.32,14.84L12,12L6.32,9.16L5.481,5.803L18.651,12 L5.481,18.197z"></path></svg>
            Send
          </button>
            
            <img class="w-22 h-12 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABVCAMAAADkHONrAAAAAXNSR0IB2cksfwAAAu5QTFRFAAAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////47V6AAAAPp0Uk5TAAwlTWuIo7jCxsrOw6uPbkUZBAMBCxgjKDRLh5+2yM/T1dnQvaeObzw3LRwGDjBkkqi3xdbi6/P4+vv89vX04bFpLBcQMl16mbzm7PD9/tfEfUAaBx01V4KyzN7t/++lgVkzFAkVK4nSUC4CH06G30E7cur33KxzOhYpVoy+6FVl8uXa3ePgYAgFJnG57pZ8YVyu0bsgeJFbSjkhHjY+RPG/eTHB5MmqEg1Gag/ASK/5y3sKbUIq6YCQVCRPtOcTOKFRpBFHP6CXQ3TbTLA9npovUoSiWK0bXqnYhXXUYrOdpn5TnJWYtVp2x3/NjSJjcJRnJ4NoZl+KSSr5a0sAAAjBSURBVHicrZl5QBN3FscTPFkKaBJCC1YkSIsQQQHJMUnkrhgyQYkHGuKRgHKJmqBdsBzhkKgoiCAUFCqHQVkIRhrBEwRqi0fxKIiruO6uu3Vtt9s9uvvfTsgEkjDJTGK/f87M7/N7837vvd/7zeBwaMLbzZo9Z+68+fa/cXB4z9HJecFCApFAIKGOMy+iC9n1/Q/cnN0XfbjYY4knheK11Pujj2f5LPP1w1OJNpOX+wesWBkYFLwqhEZnMJkAwKCzWGw2Z3VoWHgEnmoTNzIq+pM1MZS13Fg2nQHwQJ14WtFD+HGO69bHLxdYRyYJNmzctDlhy1YhnZeIJJAn8tq2fcdOsYSInSpISt6xK2G3iIGI1AvgztuekiqmpmHFpmfsCcxkIdtpBBZ5bN5LlmDyhIC8b//KYKkMnZqYyKRlHTj46W+p6FR8ds6hz1bRQRNf6oTg5Nz5Tnl2EhQoSZKav41fYDSQx2QL5VsL+Xw+paiYy2HwjOmyEu/D2aWWHaE4cvRYGWAEBehCz8DjJ2aXR1cEHDx0slJKB4zN5rFPOVcRLHogvHqplDk9iCcrPnb6aFhN7ee+dnX19VV24WfONrjN9uY3ygyf4n5xLhlvgdq0v1k6tVQgvaX1vFP+2bp6srJNIlAoCASFgqogCPwuXJzjWMmdDmlQGHRuWbs5vwp8nX9HA6eg0sqV1R1RG5DMUER0bO/0Eqn0YJDVdemMGtm/hPTLn02/GmN16MVuV4m5WCcJvry8WEOfcgTgcCVbgfRgaV3YMaGeCpTZ9/ReVZqlQlx11bWPgrhTdoji1oW7zHxM4Fpx/Qb8DMgucqy+EI9Soog3b4X1rZbBY3jSLy6Hz4jftPj+21zYVSAnuC/Hd8AiU6ekwW1Z+sxhahIq6me80lBPLhOmMihrGpZjKyCSfV+16MOc2XLna5PbhLpv4lS6aUEZZUXtAMZ6l9be4JQ1NbD1kqtRWhAjB701er8O37lLxgbVStnQM8yC7c29F600fEuX7Cu7YRfRi7zvRmCn4nAD9x8Uwe5jFH47YhANaQt7HdiwsZqTD9usoeJILj6OsfBgUVBA+vQd9cZHcgB2wfyjSVbsI1opqg7Oh92rannsM5UUpPjoZg6csVud7lsHhd4V7+NOYcCh2ZW/QU+lRu0q0IUsM+T6E6scq5PSbW6szlym/Hi3frb2vO948GRLnK9aT4XWJi8LNle15TJ8kTi6ZxiuBPLvUtH2D0QtX7atBc7hIveFk2tDEiTf1nk2kd1arbSFilPEj8XBQRbytGPSMmKk2ynYB1xvH5uMxeGoVx/DQcbuWhc5eaVu17jO37ySZwob+zUC+RkFduTap0naK6XJx8rg6LKfbWsXmIbvPwBXhrJ5C7UU9c7dKp2xBQ8abKTiSIRsd7is0oKa1NA8A91FugsA9/d+tmKhBvNjuKDLnteManewFy1wKK99YjsV15avAWDM8SgoNqKchHC5rMywGkai4iOVSjVUZUv7g2Q6X4rmDUGBsH6CpsMW3FtvJbS0nZy899rD/vvhrlfTO14WwNXKoQNygpuXblsGhYdGrDKUUJo668Unx//w1Pv0q28O1lS4i+CAKoLemvRHKVwTc8OqrMFSB9LdKQDc5/FY9n/6c6MuFJiah9DtXi6MvVETb40Dbs2JKWFPNXm8xrX6vRIQ5WmxcIcIcs9FWejPTDxAvfuab9oE62egbYLyIU8Ez8L+y8URPLadQSEeeipEhkJYzl+hyOgV6jd6XvP3qWb6MxNbbw5SVGagWmsrSnE4/ZJBEr3ZM5SEoe8487dWjjlbtUUgGtp+++XT56TYtz9kpKP5QbL3BweGeSqUD2NQr5uRafA+quBvn2ywfDaM9HmZxTQPhSJBOgZtBm58meHU8s5yssWDQHegCDCL1IpRUiHG4Qa3GPlJ1RKzP7XUPLUm1PBwgSRW60MIu974aJPI4MZd6v4RuWGO3BkwIUU7Bzaeb4Ca2DNfyY3PtqCq6/jf/ZUIKxexwH1JgWVTIUkfRUHtVvYViszkBihtnnN/ZidGip7QWAoBeHBxTT10WiX32jea3mKUeS76KWOh0VnWNf8fcTdUqNREoHDwJhRKEt+JkJlTsjLfmzu7/2y4nzad2+qWpRx+dKqkwGJgwaLZ71uuNUPcV4y0CrK19qGvq2u6d474D/586Prb1TQA3VTIoFWPmyYrlrKHj5zgoEwT/CYmcF7Mm2A5Dd2p8KAu53qBFot/8aEQ+RGeihNbxhWWNXJUmCzVihk42D4ZnFT/niysg9AV8qBJl/wktfNiDCuMTTyHE3X63M/pjMXyCQWDQMbtWe36BG165UlHH4JFqpITvlOFSpmSwLVclTAKbAzNMzgkJD/y5PwaWHrWpSaDDjmp9qT8V1g0UDPRITbId4VfdRDt3bGsoP2uRqVa8vWdcZTqjMHYrNfrjU/2RHJ557uuGhB778WoaZX2/b6L/U7mgqy3P/1zRo12ObPZqwB9sHmxx/91C6HZUp5dUcm2nSqj9NWSETbAtMiURcNYy5+pQEaJY3kV4oZN8Cs/EGLjsgEhoWE/IrcXJEH4vzuLbSoOdHlCWKrZr6JtI/9ZybchLTgUx59HLHwzcTnyy0uPRuscAQLs54ui7dTmqdq0qN3VZaHJRBDAKTy9AKUtJlEjPndOyMTuYFDW0vzq0wHUppgY+eUvaxbfwBZpPFWs1+OwKHOfbo1EGK1d1zkuRLcYZMRmLnXPGLXYtxoIf+Tas1MtaHs4qArx6MsZxcjUOkKS5L9j8/nxRp5ZMsjg5G7pyTsixvDPYVoktd8HvY/mxjznIh2+QEAm9Di/feyWDR+3qOKRCwH/TbDfPazhMHj6P1AgjykrKwyaeHzJzQ+rT02lECcP1dZUn6/UFLDoOrFowsyl55ah/L6wLJJC3X5zNLkh53D54bGaHZt6U2b9b8Heff4b2jD/dTKLFty089+4MSo1+X27Or8IcbuLAMOPyP8DmjNUHyXMQ9wAAAAASUVORK5CYII=" alt="" />
            
           
            
            
            <div class="inline-flex items-center text-gray-600">
              <svg class="w-6 h-6 fill-current mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path></svg>
      
      
              <a class="cursor-pointer w-8 h-8 rounded-full overflow-hidden">
             <img src="https://avatars.githubusercontent.com/u/68391329?s=460&u=b8ccbb6aa9dc812bbe80c87512556ff28f0e287e&v=4"/>
            </a>
            </div>
          </div>
          <div class="container mx-auto">
            <div class="flex flex-wrap py-8 flex-col sm:flex-row">
              <div class="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 m-auto sm:m-0">
                <img src="https://avatars.githubusercontent.com/u/68391329?s=460&u=b8ccbb6aa9dc812bbe80c87512556ff28f0e287e&v=4" />
              </div>
              <div class="sm:pl-10 sm:pt-4 flex-1">
                <div class="flex sm:justify-between sm:flex-row sm:flex-no-wrap justify-center flex-wrap mb-6">
                  <div class="flex flex-wrap md:w-auto w-full md:mb-0 mb-4">
                    <h2 class="text-white text-2xl w-full mb-3 text-center sm:text-left mt-4 sm:mt-0">Bereket Semagn</h2>
                    <div class="flex sm:w-auto w-full sm:justify-start justify-center">
                      <span class="text-gray-600 mr-4 tracking-wider"><span class="text-gray-400">120</span> Followers</span>
                      <span class="text-gray-600 mr-4 tracking-wider"><span class="text-gray-400">45</span> Following</span>
                    </div>
                    
                  </div>
                  
                  <button class="border border-gray-700 md:ml-auto mr-4 rounded-full w-12 h-12 inline-flex items-center justify-center text-gray-600 hover:bg-gray-700 hover:text-white flex-shrink-0">
                  <svg class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M497 80.333h-65.334V15c0-8.284-6.716-15-15-15s-15 6.716-15 15v65.333h-65.332c-8.284 0-15 6.716-15 15s6.716 15 15 15h65.332v65.334c0 8.284 6.716 15 15 15s15-6.716 15-15v-65.334H497c8.284 0 15-6.716 15-15s-6.716-15-15-15zM175.666 321.334C78.804 321.334 0 400.138 0 497c0 8.284 6.716 15 15 15h321.334c8.284 0 15-6.716 15-15 0-96.862-78.805-175.666-175.668-175.666zM175.666 64.267c-52.566 0-95.332 42.767-95.332 95.334s42.766 95.333 95.332 95.333c52.567 0 95.334-42.766 95.334-95.333s-42.767-95.334-95.334-95.334z"/>
                  </svg>
                </button>
                  
                  <button class="border border-gray-700 rounded-full w-12 h-12 inline-flex items-center justify-center text-gray-600 hover:bg-gray-700 hover:text-white flex-shrink-0">
                  <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.626 511.626">
                    <path d="M49.106 178.729c6.472 4.567 25.981 18.131 58.528 40.685 32.548 22.554 57.482 39.92 74.803 52.099 1.903 1.335 5.946 4.237 12.131 8.71 6.186 4.476 11.326 8.093 15.416 10.852 4.093 2.758 9.041 5.852 14.849 9.277 5.806 3.422 11.279 5.996 16.418 7.7 5.14 1.718 9.898 2.569 14.275 2.569h.575c4.377 0 9.137-.852 14.277-2.569 5.137-1.704 10.615-4.281 16.416-7.7 5.804-3.429 10.752-6.52 14.845-9.277 4.093-2.759 9.229-6.376 15.417-10.852 6.184-4.477 10.232-7.375 12.135-8.71 17.508-12.179 62.051-43.11 133.615-92.79 13.894-9.703 25.502-21.411 34.827-35.116 9.332-13.699 13.993-28.07 13.993-43.105 0-12.564-4.523-23.319-13.565-32.264-9.041-8.947-19.749-13.418-32.117-13.418H45.679c-14.655 0-25.933 4.948-33.832 14.844C3.949 79.562 0 91.934 0 106.779c0 11.991 5.236 24.985 15.703 38.974 10.466 13.99 21.604 24.983 33.403 32.976z"/>
                    <path d="M483.072 209.275c-62.424 42.251-109.824 75.087-142.177 98.501-10.849 7.991-19.65 14.229-26.409 18.699-6.759 4.473-15.748 9.041-26.98 13.702-11.228 4.668-21.692 6.995-31.401 6.995h-.578c-9.707 0-20.177-2.327-31.405-6.995-11.228-4.661-20.223-9.229-26.98-13.702-6.755-4.47-15.559-10.708-26.407-18.699-25.697-18.842-72.995-51.68-141.896-98.501C17.987 202.047 8.375 193.762 0 184.437v226.685c0 12.57 4.471 23.319 13.418 32.265 8.945 8.949 19.701 13.422 32.264 13.422h420.266c12.56 0 23.315-4.473 32.261-13.422 8.949-8.949 13.418-19.694 13.418-32.265V184.437c-8.186 9.132-17.7 17.417-28.555 24.838z"/>
                  </svg>
                </button>
                  
                </div>
                <p class="text-gray-500 leading-normal px-4 sm:px-0">
                  I make things.
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center border-t border-gray-700 py-5">
            <a href="#" class="text-white mx-5">Repositories</a>
            <a href="#" class="text-gray-600 mx-5 hover:text-gray-500">Projects</a>
            <a href="#" class="text-gray-600 mx-5 hover:text-gray-500">Packages</a>
          </div>
          
        </div>
        <div class="pt-10 pl-6 pr-6 pb-10 flex-1" style={{backgroundColor: "#151515"}}>
          
          <div class="container mx-auto">
            <div class="flex flex-wrap md:-mx-3">
              
              <div class="md:w-1/2 px-3 mb-6 w-full">
                <div class="flex ring-2 ring-opacity-50 ring-gray-100 w-full h-full flex-col flex-wrap p-5 rounded overflow-hidden transform motion-safe:hover:scale-110 decoration-clone" style={{backgroundColor: "#1a1a1a"}}>
                  <a href="#"><h2 class="text-white text-lg mb-2">oasis</h2></a>
                  <p class="text-white opacity-75 truncate">Browse open source projects</p>
                  <div class="flex flex-wrap justify-between items-center mt-auto pt-6">
                    <div class="inline-flex items-center">
                      <div class="relative inline-flex rounded-full h-3 w-3 bg-blue-700"></div>
                      <div class="flex-1 pl-2">
                        <h2 class="text-white mb-1">TypeScript</h2>
                      </div>
                    </div>
                    <span class="text-white opacity-50 inline-flex flex-row-reverse">
                    <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.516,14.323l-1.49,6.452c-0.092,0.399,0.068,0.814,0.406,1.047C5.603,21.94,5.801,22,6,22 c0.193,0,0.387-0.056,0.555-0.168L12,18.202l5.445,3.63c0.348,0.232,0.805,0.223,1.145-0.024c0.338-0.247,0.487-0.68,0.372-1.082 l-1.829-6.4l4.536-4.082c0.297-0.268,0.406-0.686,0.278-1.064c-0.129-0.378-0.47-0.644-0.868-0.676L15.378,8.05l-2.467-5.461 C12.75,2.23,12.393,2,12,2s-0.75,0.23-0.911,0.589L8.622,8.05L2.921,8.503C2.529,8.534,2.192,8.791,2.06,9.16 c-0.134,0.369-0.038,0.782,0.242,1.056L6.516,14.323z M9.369,9.997c0.363-0.029,0.683-0.253,0.832-0.586L12,5.43l1.799,3.981 c0.149,0.333,0.469,0.557,0.832,0.586l3.972,0.315l-3.271,2.944c-0.284,0.256-0.397,0.65-0.293,1.018l1.253,4.385l-3.736-2.491 c-0.336-0.225-0.773-0.225-1.109,0l-3.904,2.603l1.05-4.546c0.078-0.34-0.026-0.697-0.276-0.94l-3.038-2.962L9.369,9.997z"></path></svg>
      82
                  </span>
                  </div>
                </div>
              </div>
              <div class="md:w-1/2 px-3 mb-6 w-full">
                <div class="flex ring-2 ring-opacity-50 ring-gray-100 w-full h-full flex-col flex-wrap p-5 rounded overflow-hidden transform motion-safe:hover:scale-110 decoration-clone" style={{backgroundColor: "#1a1a1a"}}>
                  <a href="#"><h2 class="text-white text-lg mb-2"><strong>carbon-app</strong>/carbon</h2></a>
                  <p class="text-white opacity-75 truncate">Adwords Keyword Research For Beginners</p>
                  <div class="flex flex-wrap justify-between items-center mt-auto pt-6">
                    <div class="inline-flex items-center">
                      <div class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></div>
                      <div class="flex-1 pl-2">
                        <h2 class="text-white mb-1">JavaScript</h2>
                      </div>
                    </div>
                    <span class="text-white opacity-50 inline-flex flex-row-reverse">
                    <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.516,14.323l-1.49,6.452c-0.092,0.399,0.068,0.814,0.406,1.047C5.603,21.94,5.801,22,6,22 c0.193,0,0.387-0.056,0.555-0.168L12,18.202l5.445,3.63c0.348,0.232,0.805,0.223,1.145-0.024c0.338-0.247,0.487-0.68,0.372-1.082 l-1.829-6.4l4.536-4.082c0.297-0.268,0.406-0.686,0.278-1.064c-0.129-0.378-0.47-0.644-0.868-0.676L15.378,8.05l-2.467-5.461 C12.75,2.23,12.393,2,12,2s-0.75,0.23-0.911,0.589L8.622,8.05L2.921,8.503C2.529,8.534,2.192,8.791,2.06,9.16 c-0.134,0.369-0.038,0.782,0.242,1.056L6.516,14.323z M9.369,9.997c0.363-0.029,0.683-0.253,0.832-0.586L12,5.43l1.799,3.981 c0.149,0.333,0.469,0.557,0.832,0.586l3.972,0.315l-3.271,2.944c-0.284,0.256-0.397,0.65-0.293,1.018l1.253,4.385l-3.736-2.491 c-0.336-0.225-0.773-0.225-1.109,0l-3.904,2.603l1.05-4.546c0.078-0.34-0.026-0.697-0.276-0.94l-3.038-2.962L9.369,9.997z"></path></svg>
      27k
                  </span>
                  </div>
                </div>
              </div>
              <div class="md:w-1/2 px-3 mb-6 w-full">
                <div class="flex ring-2 ring-opacity-50 ring-gray-100 w-full h-full flex-col flex-wrap p-5 rounded overflow-hidden transform motion-safe:hover:scale-110 decoration-clone" style={{backgroundColor: "#1a1a1a"}}>
                  <a href=""><h2 class="text-white text-lg mb-2">lunar-theme</h2></a>
                  <p class="text-white opacity-75 overflow-clip">A minimal dark and light theme for Visual Studio Code.</p>
                  <div class="flex flex-wrap justify-between items-center mt-auto pt-6">
                    <div class="inline-flex items-center">
                      <div class="relative inline-flex rounded-full h-3 w-3 bg-blue-700"></div>
                      <div class="flex-1 pl-2">
                        <h2 class="text-white mb-1">TypeScript</h2>
                      </div>
                    </div>
                    <span class="text-white opacity-50 inline-flex flex-row-reverse">
                    <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.516,14.323l-1.49,6.452c-0.092,0.399,0.068,0.814,0.406,1.047C5.603,21.94,5.801,22,6,22 c0.193,0,0.387-0.056,0.555-0.168L12,18.202l5.445,3.63c0.348,0.232,0.805,0.223,1.145-0.024c0.338-0.247,0.487-0.68,0.372-1.082 l-1.829-6.4l4.536-4.082c0.297-0.268,0.406-0.686,0.278-1.064c-0.129-0.378-0.47-0.644-0.868-0.676L15.378,8.05l-2.467-5.461 C12.75,2.23,12.393,2,12,2s-0.75,0.23-0.911,0.589L8.622,8.05L2.921,8.503C2.529,8.534,2.192,8.791,2.06,9.16 c-0.134,0.369-0.038,0.782,0.242,1.056L6.516,14.323z M9.369,9.997c0.363-0.029,0.683-0.253,0.832-0.586L12,5.43l1.799,3.981 c0.149,0.333,0.469,0.557,0.832,0.586l3.972,0.315l-3.271,2.944c-0.284,0.256-0.397,0.65-0.293,1.018l1.253,4.385l-3.736-2.491 c-0.336-0.225-0.773-0.225-1.109,0l-3.904,2.603l1.05-4.546c0.078-0.34-0.026-0.697-0.276-0.94l-3.038-2.962L9.369,9.997z"></path></svg>
      21
                  </span>
                  </div>
                </div>
              </div>
              <div class="md:w-1/2 px-3 mb-6 w-full">
                <div class="flex ring-2 ring-opacity-50 ring-gray-100 w-full h-full flex-col flex-wrap p-5 rounded overflow-hidden transform motion-safe:hover:scale-110 decoration-clone" style={{backgroundColor: "#1a1a1a"}}>
                  <h2 class="text-white text-lg mb-2">hiddentools</h2>
                  <p class="text-white opacity-75 overflow-clip">Discover a wide collection of tools made by the community - for you. Search, filter, and find new tools.</p>
                  <div class="flex flex-wrap justify-between items-center mt-auto pt-6">
                    <div class="inline-flex items-center">
                      <div class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></div>
                      <div class="flex-1 pl-2">
                        <h2 class="text-white mb-1">JavaScript</h2>
                      </div>
                    </div>
                    <span class="text-white opacity-50 inline-flex flex-row-reverse">
                    <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.516,14.323l-1.49,6.452c-0.092,0.399,0.068,0.814,0.406,1.047C5.603,21.94,5.801,22,6,22 c0.193,0,0.387-0.056,0.555-0.168L12,18.202l5.445,3.63c0.348,0.232,0.805,0.223,1.145-0.024c0.338-0.247,0.487-0.68,0.372-1.082 l-1.829-6.4l4.536-4.082c0.297-0.268,0.406-0.686,0.278-1.064c-0.129-0.378-0.47-0.644-0.868-0.676L15.378,8.05l-2.467-5.461 C12.75,2.23,12.393,2,12,2s-0.75,0.23-0.911,0.589L8.622,8.05L2.921,8.503C2.529,8.534,2.192,8.791,2.06,9.16 c-0.134,0.369-0.038,0.782,0.242,1.056L6.516,14.323z M9.369,9.997c0.363-0.029,0.683-0.253,0.832-0.586L12,5.43l1.799,3.981 c0.149,0.333,0.469,0.557,0.832,0.586l3.972,0.315l-3.271,2.944c-0.284,0.256-0.397,0.65-0.293,1.018l1.253,4.385l-3.736-2.491 c-0.336-0.225-0.773-0.225-1.109,0l-3.904,2.603l1.05-4.546c0.078-0.34-0.026-0.697-0.276-0.94l-3.038-2.962L9.369,9.997z"></path></svg>
      21
                  </span>
                  </div>
                </div>
              </div>
              <div class="md:w-1/2 px-3 mb-6 w-full">
                <div class="flex ring-2 ring-opacity-50 ring-gray-100 w-full h-full flex-col flex-wrap p-5 rounded overflow-hidden transform motion-safe:hover:scale-110 decoration-clone" style={{backgroundColor: "#1a1a1a"}}>
                  <h2 class="text-white text-lg mb-2">codemoji</h2>
                  <p class="text-white opacity-75 overflow-clip">Emoji shortcode's for Github commit messages for anything markdown-related! Copy emojis/codes and use them for the right purposes.</p>
                  <div class="flex flex-wrap justify-between items-center mt-auto pt-6">
                    <div class="inline-flex items-center">
                      <div class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></div>
                      <div class="flex-1 pl-2">
                        <h2 class="text-white mb-1">JavaScript</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="md:w-1/2 px-3 mb-6 w-full">
                <div class="flex ring-2 ring-opacity-50 ring-gray-100 w-full h-full flex-col flex-wrap p-5 rounded overflow-hidden transform motion-safe:hover:scale-110 decoration-clone" style={{backgroundColor: "#1a1a1a"}}>
                  <h2 class="text-white text-lg mb-2"><strong>facebook</strong>/react</h2>
                  <p class="text-white opacity-75 overflow-clip">A declarative, efficient, and flexible JavaScript library for building user interfaces.</p>
                  <div class="flex flex-wrap justify-between items-center mt-auto pt-6">
                    <div class="inline-flex items-center">
                      <div class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></div>
                      <div class="flex-1 pl-2">
                        <h2 class="text-white mb-1">JavaScript</h2>
                      </div>
                    </div>
                    <span class="text-white opacity-50 inline-flex flex-row-reverse">
                    <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.516,14.323l-1.49,6.452c-0.092,0.399,0.068,0.814,0.406,1.047C5.603,21.94,5.801,22,6,22 c0.193,0,0.387-0.056,0.555-0.168L12,18.202l5.445,3.63c0.348,0.232,0.805,0.223,1.145-0.024c0.338-0.247,0.487-0.68,0.372-1.082 l-1.829-6.4l4.536-4.082c0.297-0.268,0.406-0.686,0.278-1.064c-0.129-0.378-0.47-0.644-0.868-0.676L15.378,8.05l-2.467-5.461 C12.75,2.23,12.393,2,12,2s-0.75,0.23-0.911,0.589L8.622,8.05L2.921,8.503C2.529,8.534,2.192,8.791,2.06,9.16 c-0.134,0.369-0.038,0.782,0.242,1.056L6.516,14.323z M9.369,9.997c0.363-0.029,0.683-0.253,0.832-0.586L12,5.43l1.799,3.981 c0.149,0.333,0.469,0.557,0.832,0.586l3.972,0.315l-3.271,2.944c-0.284,0.256-0.397,0.65-0.293,1.018l1.253,4.385l-3.736-2.491 c-0.336-0.225-0.773-0.225-1.109,0l-3.904,2.603l1.05-4.546c0.078-0.34-0.026-0.697-0.276-0.94l-3.038-2.962L9.369,9.997z"></path></svg>
      166k
                  </span>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div class="text-center">
              <button class="border border-gray-600 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-600 hover:text-white">Show More</button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }