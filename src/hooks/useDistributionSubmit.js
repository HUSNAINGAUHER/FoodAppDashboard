import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import DistributionService from "../services/DistributionService";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [start, setStart] = useState("");

  const [end, setEnd] = useState("");

  const [children, setChildren] = useState("");
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const productData = {
      start: data.start,
      end: data.end,
      limit: data.limit,
    };

    if (id) {
      DistributionService.updateDistribution(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      DistributionService.addDistribution(productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("start");
      setValue("end");
      setValue("limit");
      return;
    }

    if (id) {
      DistributionService.getProductById(id)
        .then((res) => {
          if (res) {
            setValue("limit", res.limit);

            setValue("start", dayjs(res.start).format("YYYY-MM-DD"));
            setValue("end", dayjs(res.end).format("YYYY-MM-DD"));
          }
        })
        .catch((err) => {
          console.log(err);
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
    start,
    end,
  };
};

export default useProductSubmit;
