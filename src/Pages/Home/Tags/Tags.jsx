// TagsCard.js

const Tags = () => {

    const sampleTags = [
        { name: 'Technology', postCount: 25 },
        { name: 'Science', postCount: 18 },
        { name: 'Art', postCount: 32 },
        { name: 'Books', postCount: 14 },
        { name: 'Movies', postCount: 20 },
        { name: 'Music', postCount: 28 },
        { name: 'Health', postCount: 12 },
        { name: 'Travel', postCount: 23 },
        { name: 'Food', postCount: 30 },
        { name: 'Gaming', postCount: 15 },
        // Add more tags as needed
      ];
      

      

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Popular Tags</h2>
      <div className="divider"></div> 
      <div>
        {sampleTags.map((tag) => (
          <div key={tag.name} className="flex justify-between items-center mb-2">
            <span className="text-gray-700">{tag.name}</span>
            <span className="text-gray-500">{tag.postCount} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
