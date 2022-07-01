import Tag from 'ui/Tag';

function Tags () {
  return (
    <div className="block">
      <h2 className="text-h2">Tags</h2>
      <div className="block-content">
        <div style={{ display: 'flex', gap: '16px' }}>
          <Tag state="pending">Pending</Tag>
          <Tag state="approved">Approved</Tag>
          <Tag state="rejected">Rejected</Tag>
        </div>
      </div>
    </div>
  );
}

export default Tags;
