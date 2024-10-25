import Head from "next/head";
import { useIntl } from "react-intl";
function Terms() {
  const intl = useIntl();
  const messages = intl.messages;
  return (
    <div>
      <Head>
        <title>Cagir.az - Razılaşma müqaviləsi</title>
        <meta property="og:title" content="Cagir.az - Razılaşma müqaviləsi" />
        <meta
          name="description"
          content="Cagir.az - Razılaşma müqaviləsi haqqında daha ətraflı və detallı məlumat əldə etmək üçün bu səhifəyə baş çəkib faydalana bilərsiniz."
        />
      </Head>
      <div className="flex flex-col pb-[50px] md:pb-[60px] lg:pb-[70px] xl:pb-[80px] 2xl:pb-[90px] pt-[30px]">
        <h1 className="my-h2 mb-[15px] lg:mb-[30px] text-center">
          {messages.terms}
        </h1>
        <div className="flex flex-col font-semibold  gap-y-[15px] pb-[30px] lg:pb-[90px] text-[#595959]">
          <p className="text-[12px] lg:text-[18px] leading-[22px] lg:leading-[34px]">
            Burada yer alan “Cagir.az İstifadə Qaydaları və Şərtləri” (bundan
            sonra “Qaydalar və Şərtlər”), “Cagir.az” (bundan sonra “Vasitəçi”)
            xidmətlərindən istifadəsini əhatə etməkdədir. Bu “Qaydalar və
            Şərtlər” Sizinlə və “Cagir.az” arasında müqavilə (Razılaşma)
            yaradır. Müqaviləni diqqətlə oxuyun. Başa düşdüyünüzü və Razılaşmanı
            qəbul etdiyinizi təsdiq edin.
          </p>
          <ol className="list-decimal text-[12px] lg:text-[18px] leading-[22px] lg:leading-[34px] px-[20px] lg:px-[60px] ">
            {/* Müqavilənin predmeti */}
            <li className="text-black ">Müqavilənin predmeti</li>
            <ul className="list-disc">
              <li key={1}>
                Bu müqavilə “az” xidmələrindən istifadə edə biləcəyinizi təmin
                edir. Xidmətlərimiz sadəcə Azərbaycan Respublikasının sərhədləri
                daxilində keçərlidir. Xidmətlərimizdən istifadə etmək üçün uyğun
                cihaz, proqram təminatı və internetə qoşulma lazımdır.
              </li>
              <li key={2}>
                Bu xidməti istifadə etməzdən əvvəl, istifadəçilər “Qaydalar və
                Şərtlər”i, digər bütün standart istifadə qaydalarını və
                şərtlərini, həmçinin “Vasitəçi” tərəfindən öncədən təyin edilən
                üzvlük razılaşmalarını qəbul etmiş sayılır.
              </li>
              <li key={3}>
                Bu xidməti istifadə edərək, istifadəçilər “Qaydalar və Şərtlər”i
                qəbul etmiş sayılır. Əlavə olaraq, “Vasitəçi”, “Qaydalar və
                Şərtlər” də istifadəçilərə əvvəldən və ya sonradan heç bir
                xəbərdarlıq etmədən qanuna uyğun olaraq dəyişiklik edə bilər.
                “Qaydalar və Şərtlər” üzərində aparılan dəyişikliklər, xidmətdə
                yayımlandığı andan etibarən qüvvədə olmuş sayılır. Dəyişiklik
                aparıldıqdan sonra ximdəti istifadə edən müştərilər, yeni
                dəyişiklikləri qəbul etmiş sayılır.
              </li>
              <li key={4}>
                “Vasitəçi”, xidməti idarə edə bilmək üçün, xidmət daxilində olan
                rəyləri, söhbətləri, sualları, həmçinin xidmət detallarını,
                sifarişləri yadda saxlaya bilər. Əlavə olaraq “Vasitəçi”, vacib
                olduğu halda video və şəkilləri də arxivləyə bilər. “Vasitəçi”
                bu məlumatları mümkün qədər ən az və sadəcə xidmətin daha yaxşı
                işləməsinə mane olan qaçınılmaz səbəblərdən dolayı istifadə
                edəcəkdir. İstifadəçilər, “Vasitəçi”nin məlumatları arxivləməsi
                və istifadə etməsini başa düşmüş və qəbul etmiş sayılırlar.
              </li>
              <li key={5}>
                Bu “Qaydalar və Şərtlər”, “Vasitəçi”nin web səhifəsi, elektron
                poçt və s. kanallar ilə “Vasitəçi”dən istifadəçilərə göndərilən
                xidmətlə bağlı hər bir məlumata tətbiq edilir.
              </li>
            </ul>
            {/* Xidmətlərin göstərilmə qaydası */}
            <li className="text-black pt-[15px]" key={0}>
              Xidmətlərin göstərilmə qaydası
            </li>
            <ul className="list-disc">
              <li key={6}>
                Xidmətin göstərilməsi ilkin sifariş üzrə həyata keçirilir.
                Göstəriləcək xidmətin sifarişi “Müştəri” tərəfindən verilir.
              </li>
              <li key={7}>
                “Müştəri” sifarişi cari saatdan 2 saat sonraya edə bilir (Təcili
                çağırış istisna olmaqla) və “İcraçı” da öz növbəsində
                “Müştəri”nin təyin etdiyi vaxtda qeyd edilmiş ünvanda sifarişi
                icra etməyə başlayır.
              </li>
              <li key={8}>
                “İcraçı” “Müştəri”nin sifariş verdiyi xidmətləri həyata keçirir
                (işi icra edir).
              </li>
              <li key={9}>
                “İcraçı” sifarişdə nəzərdə tutulan müddət ərzində xidmətləri
                icra edir.
              </li>
              <li key={10}>
                İcraçı”nın yerinə yetirdiyi işlər “Müştəri” tərəfindən təhvil
                alınır.{" "}
              </li>
            </ul>
            {/* Tərəflərin vəzifə və öhdəlikləri */}
            <li className="text-black pt-[15px]" key={11}>
              Tərəflərin vəzifə və öhdəlikləri
            </li>
            <p className="text-black pt-[5px]">“Vasitəçi”</p>
            <ul className="list-disc">
              <li key={12}>
                “Vasitəçi” “Müştəri” tərəfindən daxil olan sifarişi “İcraçı”ya
                platforma, sms və ya zəng vasitəsiylə yönləndirir.
              </li>
              <li key={13}>
                Müqavilədə nəzərdə tutulan qaydada “Müştəri”nin müəyyən etdiyi
                xidmətləri “İcraçı” vasitəsiylə həyata keçirir.
              </li>
              <li key={14}>
                “Vasitəçi”nin öhdəliklərinə sifarişin detallarının “İcraçı”ya
                çatdırılması aiddir.
              </li>
              <li key={15}>
                “Müştəri” ilə “İcraçı” arasında yaranan hər hansısa bir
                anlaşılmazlıq( maddi və mənəvi zərərə görə ), mübahisə və digər
                arzuolunmaz hallarda “Vasitəçi” tərəflər arasında heç bir
                məsuliyyət daşımır və bu məsələdə öhdəlik götürmür.
              </li>
            </ul>
            {/* Müştəri: */}
            <p className="text-black pt-[5px]">“Müştəri”</p>
            <ul className="list-disc">
              <li key={16}>
                “İçraçı” məlumatlarını mənimsəmək, yaymaq və istifadəsindən
                başqa bir məqsədlər üçün istifadə etmək qadağandır. Əgər belə
                hallar aşkarlanarsa həm “Vasitəçi”, həm də “İçraçı” hüquqi
                xidmətə müraciət edə bilər.
              </li>
              <li key={17}>
                “Müştəri” növbəti dəfə eyni “İcraçı”nın xidmətlərindən
                yararlanmaq istəsə bunu yalnız “cagir.az” platforması və ya
                mobil tətbiqindən istifadə etməklə həyata keçirə bilər.
              </li>
              <li key={18}>
                Xidmətin ödənişinin gecikməsi, “İcraçı” ile kobud rəftar etmə,
                internet portalında (web saytda) sistematik hiylələr işlətmə,
                xidmətdən arzuolunmaz məqsədlər üçün istifadə kimi hallar baş
                verərsə müştəri sistem tərəfindən əngəllənir və eyni
                məlumatların istifadəsinə bir daha icazə verilmir. Əgər
                əngəllənən müştərinin məlumatlarına çox yaxın bir məlumatlarla
                qeydiyyat halı baş verərsə o zaman bu qeydiyyat sistem
                nəzarətçisi və Əməliyyatlar üzrə Koordinator tərəfindən
                araşdırma aparılmaqla qeydiyyat tamamlanır.
              </li>
            </ul>
            <li className="text-black pt-[15px]" key={19}>
              Hesablaşma qaydası
            </li>
            <ul className="list-disc">
              <li key={20}>
                Göstərilən xidmətlərin qiymətləndirilməsi “Vasitəçi” tərəfindən
                müəyyən edilir.
              </li>
              <li key={21}>
                Hazırki Müqavilə üzrə hesablaşmalar nağd qaydada və ya bank
                hesabına köçürmə yolu ilə həyata keçirilir.
              </li>
              <li key={22}>
                Hesablaşma Azərbaycan manatı (AZN) ilə aparılacaq.
              </li>
              <li key={23}>
                “Vasitəçi” özünün təyin etdiyi qiymətləri müəyyən səbəblərdən
                azalda və ya artıra bilər.
              </li>
              <li key={24}>
                Xidmətin növündən, sifariş həcmindən, “İcraçı”nın xidmət
                məsafəsindən asılı olaraq xidmətin qiyməti dəyişə bilər. Bu
                qiymət dəyişimi “Müştəri” ilə “İçraçı” arasında danışılır və
                standart qiymətdən sonra yaranan qiymət dəyişməsində
                “Vasitəçi”nin heç bir asılılıq yoxdur.
              </li>
            </ul>
            <li className="text-black pt-[15px]" key={34}>
              Fors-Major
            </li>
            <ul className="list-disc">
              <li key={25}>
                Hazırki Müqavilə üzrə öhdəliklərini yerinə yetirməyən və
                lazımınca yerinə yetirməyən Tərəf, öhdəliyin yerinə
                yetirməməsini fors-major hallarının, yəni konkret vaxt hüdudunda
                meydana gələn qarşısı alınmaz fövqaladə halların səbəbindən baş
                verməsini sübut etdiyi halda, heç bir məsuliyyət daşımır.
                Qarşısı alınmaz hallar aşağıdakılardır: sistem nəzarətçisindən
                asılı olmayan səbəblər və təbii fəlakətlər (zəlzələ, daşqın,
                vulkan püskürməsi, torpaq sürüşməsi, sunami və s.). Müqavilə
                üzrə öhdəliklərin icra edilmə yerində insan üçün normal həyat
                fəaliyyəti istisna edən küləyin gücü, hərarəti və çöküntülərin
                dərəcəsi; icra hakimyyəti orqanlarının moratoriumları və
                Tərəflərin icra olunmalı öhdəliklər üçün fövqaladə hal kimi
                müəyyən edə bildikləri digər hallar.
              </li>
              <li key={26}>
                Fors-major hallarının təsiri altına düşən Tərəf bu barədə digər
                Tərəfi belə halların başlandığı andan 10 (on) təqvim günü
                müddətindən gec olmayaraq xəbərdar etməlidir. Digər tərəfi
                vaxtında xəbərdar etməmə halı fors-major halına əsaslanma hüququ
                vermir.
              </li>
            </ul>
            <li className="text-black pt-[15px]" key={27}>
              Mübahisələrin həll edilməsi
            </li>
            <ul className="list-disc">
              <li key={28}>
                Bu Müqavilədən irəli gələn bütün mübahisələr danışıqlar
                vasitəsilə həll edilir.
              </li>
              <li key={29}>
                Hazırki Müqavilə üzrə mübahisələr tərəflərin öz aralarında həll
                edilir.
              </li>
            </ul>
            <li className="text-black pt-[15px]" key={30}>
              Yekun müddəalar
            </li>
            <ul className="list-disc">
              <li key={31}>
                Hazırki Müqavilə ilə tənzimlənməyən müddəalar Azərbaycan
                Respublikasının qanunvericiliyi ilə nizamlanır.
              </li>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Terms;
