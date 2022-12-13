import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Textarea, Select } from "@windmill/react-ui";
import ReactTagInput from "@pathofdev/react-tag-input";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import SelectOption from "../form/SelectOption";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import ChildrenCategory from "../category/ChildrenCategory";
import ParentCategory from "../category/ParentCategory";
import useDistributionSubmit from "../../hooks/useDistributionSubmit";

const ProductDrawer = ({ id }) => {
  const {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  } = useDistributionSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Product"
            description="Updated your product and necessary information from here"
          />
        ) : (
          <Title
            title="Add Product"
            description="Add your product and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Start Date" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Start Date"
                  name="start"
                  type="date"
                  placeholder="DD-MM-YYYY"
                />
                <Error errorName={errors.start} />
              </div>
              <LabelArea label="End Date" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="End Date"
                  name="end"
                  type="date"
                  placeholder="DD-MM-YYYY"
                />
                <Error errorName={errors.end} />
              </div>

              <LabelArea label="Cart Limit" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  label="Limit"
                  name="limit"
                  type="number"
                  placeholder="Cart Limit"
                />
                <Error errorName={errors.limit} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Distribution" />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
