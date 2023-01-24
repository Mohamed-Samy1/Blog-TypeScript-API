
/*
  The base serializer is used here to be able to construct the base
  for building up the serializer and export it in one step
  in both blog serializer and user serializer
*/

const BaseSerializer = (dict: any, fields: string[]) => {
  const data = Object();
  fields.forEach((key: any) => {
    const k: string = key;
    const v: string = dict[key];
    data[k] = v;
  });
  return data;
};

const userFields: string[] = [
  "_id", 
  "name", 
  "email", 
  "role",
  "createdAt",
  "updatedAt"
];

const blogFields: string[] = [
  "_id",
  "title",
  "description",
  "tags",
  "author",
  "createdAt",
  "updatedAt"
];

export const Serializer = {
  
  //USER SERIALIZER
  userSerializer: (user: any) => BaseSerializer(user, userFields),
  
  usersSerializer: (users: any) => {
    const data: any[] = [];
    users.forEach((user: any) => {
      data.push(Serializer.userSerializer(user));
    });
    return data;
  },
  //BLOG SERIALIZER
  blogSerializer: (blog: any) => BaseSerializer(blog, blogFields),

  blogsSerializer: (blogs: any) => {
    const data: any[] = [];
    blogs.forEach((blog: any) => {
      data.push(Serializer.blogSerializer(blog));
    });
    return data;
  }
};
