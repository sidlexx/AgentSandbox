import KnowledgeSearch from '../KnowledgeSearch';

export default function KnowledgeSearchExample() {
  return (
    <div className="p-8 max-w-3xl">
      <KnowledgeSearch onSearch={(query) => console.log('Searching for:', query)} />
    </div>
  );
}
