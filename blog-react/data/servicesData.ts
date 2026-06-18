interface Services {
    title: string
    description: string
    href?: string
    imgSrc?: string
  }
  
  const servicesData: Services[] = [
    {
      title: 'Website Development',
      description: `We understand that your website is more than just a collection of web pages, its your digital storefront, your brand's voice to connecting with a global audience.`,
      imgSrc: '/static/images/google.png',
    //  href: 'https://www.google.com',
    },
    {
      title: 'Website Designing',
      description: `We understand the critical role a well-designed website plays in establishing a strong online presence.`,
      imgSrc: '/static/images/time-machine.jpg',
      //href: '/blog/the-time-machine',
    },
  ]
  
  export default servicesData
  