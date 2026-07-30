import BreadcrumbHeader from './BreadcrumbHeader';

export default function MenuPageShell({ title, description }) {
  return (
    <div className="w-full h-full">
      <section className="bg-white">
        <BreadcrumbHeader title={title} />
        <div className="py-6 px-5 sm:px-6">
          <p className="text-sm text-[#6B7280]">{description}</p>
        </div>
      </section>
    </div>
  );
}
